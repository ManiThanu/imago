class imagoShare extends Directive

  constructor: ($compile, $templateCache, $http) ->

    defaultTemplate = '/imago/imago-share.html'

    getTemplate = (url) ->

      templateLoader = $http.get(url,
        cache: $templateCache
      )
      templateLoader

    return {

      scope:
        asset: "="
      controller: 'imagoShareController as imagoshare'
      link: (scope, element, attrs) ->
        template = if attrs.templateurl then attrs.templateurl else defaultTemplate

        syntax = undefined

        getTemplate(template).success((html) ->
          # element.html html
          syntax = html
        ).then ->
          element.append $compile(syntax)(scope)

    }

class imagoShareController extends Controller

  constructor: ($scope, $attrs, $location) ->
    @location = $location.absUrl()

    return console.log 'You need to specify one service at least.' unless $attrs.imagoShare

    options = $scope.$eval $attrs.imagoShare

    if _.isArray options
      for item in options
        @[item] = true
    else if $attrs.imagoShare is 'all'
      @all = true

