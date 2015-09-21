class imagoWorker extends Service

  store: []
  notSupported: false

  test: ->
    scriptText = 'this.onmessage=function(e){postMessage(e.data)}'
    try
      blob = new Blob([scriptText], {type:'text/javascript'})
    catch e
      @notSupported = true
    return if @notSupported
    try
      worker = new Worker(URL.createObjectURL(blob))
      worker.terminate()
    catch e
      @notSupported = true

  constructor: (@$q, @$http) ->
    @test()

  create: (path, data, defer) =>
    worker = new Worker(path)

    worker.addEventListener 'message', (e) =>
      defer.resolve e.data
      worker.terminate()

    worker.postMessage data

  work: (data) =>
    defer = @$q.defer()

    defer.reject('nodata or path') unless data and data.path

    find = _.find @store, {'path': data.path}
    if @notSupported
      @create data.path, data, defer
    else if find
      @create find.blob, data, defer
    else
      windowURL = window.URL or window.webkitURL
      @$http.get(data.path, {cache: true}).then (response) =>
        stringified = response.data.toString()
        blob = new Blob([stringified], {type: 'application/javascript'})
        blobURL = windowURL.createObjectURL(blob)

        @store.push {'path': data.path, 'blob': blobURL}

        @create blobURL, data, defer

    defer.promise
