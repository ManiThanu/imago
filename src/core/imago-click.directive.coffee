class ImagoClick extends Directive

  constructor: ($parse, imagoUtils) ->

    return {

      link: (scope, element, attrs) ->

        fn = $parse(attrs.imagoClick)
        mobile = imagoUtils.isMobile()

        callback = (evt) ->
          run = ->
            fn(scope, {$event: evt})

          scope.$apply(run)

        if mobile
          element.on 'touchstart', (evt) ->
            callback(evt)
        else
          element.on 'click', (evt) ->
            callback(evt)

    }
