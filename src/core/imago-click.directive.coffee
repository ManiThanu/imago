class ImagoClick extends Directive

  constructor: ($parse) ->

    return {

      link: (scope, element, attrs) ->
        clickHandler = if angular.isFunction(attrs.imagoClick) then clickExpr else $parse(attrs.imagoClick)

        element.on 'click', (evt) ->
          callback = ->
            clickHandler(scope, {$event: evt})

          scope.$apply(callback)

        element.onclick = angular.noop

    }
