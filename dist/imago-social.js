var imagoLike;

imagoLike = (function() {
  function imagoLike() {
    return {
      scope: {},
      templateUrl: '/imago/imagoLike.html',
      controller: function() {}
    };
  }

  return imagoLike;

})();

angular.module('imago').directive('imagoLike', [imagoLike]);

var imagoShare;

imagoShare = (function() {
  function imagoShare($location) {
    return {
      scope: {
        asset: "="
      },
      templateUrl: '/imago/imagoShare.html',
      controllerAs: 'imagoshare',
      controller: function($scope, $element, $attrs) {
        var item, options, _i, _len, _results;
        this.location = $location.absUrl();
        if (!$attrs.imagoShare) {
          return console.log('You need to specify one service at least.');
        }
        options = $scope.$eval($attrs.imagoShare);
        if (_.isArray(options)) {
          _results = [];
          for (_i = 0, _len = options.length; _i < _len; _i++) {
            item = options[_i];
            _results.push(this[item] = true);
          }
          return _results;
        } else if ($attrs.imagoShare === 'all') {
          return this.all = true;
        }
      }
    };
  }

  return imagoShare;

})();

angular.module('imago').directive('imagoShare', ['$location', imagoShare]);

angular.module("imago").run(["$templateCache", function($templateCache) {$templateCache.put("/imago/imagoLike.html","<div class=\"social\"><a href=\"http://instagram.com/###\" target=\"_blank\" class=\"instagram\">Instagram</a><a href=\"https://www.facebook.com/###\" target=\"_blank\" class=\"facebook\">Facebook</a><a href=\"https://plus.google.com/###\" target=\"_blank\" class=\"googleplus\">Google +</a></div>");
$templateCache.put("/imago/imagoShare.html","<div class=\"share\"><a ng-href=\"http://www.facebook.com/share.php?u={{imagoshare.location}}\" target=\"_blank\" ng-if=\"imagoshare.facebook || imagoshare.all\" class=\"fa fa-facebook\"></a><a ng-href=\"http://twitter.com/home?status={{imagoshare.location}}\" target=\"_blank\" ng-if=\"imagoshare.twitter || imagoshare.all\" class=\"fa fa-twitter\"></a><a ng-href=\"https://plus.google.com/share?url={{imagoshare.location}}\" ng-if=\"imagoshare.google || imagoshare.all\" class=\"fa fa-google\"></a><a ng-href=\"https://www.linkedin.com/shareArticle?mini=true&amp;url={{imagoshare.location}}&amp;title={{asset | meta:\'title\'}}&amp;summary=&amp;source={{asset.serving_url}}\" target=\"_blank\" ng-if=\"imagoshare.linkedin || imagoshare.all\" class=\"fa fa-linkedin\"></a><a ng-href=\"http://www.tumblr.com/share/photo?source={{imagoshare.location}}&amp;caption={{asset | meta:\'title\'}}\" target=\"_blank\" ng-if=\"imagoshare.tumblr|| imagoshare.all\" class=\"fa fa-tumblr\"></a><a ng-href=\"http://www.pinterest.com/pin/create/abutton/?url={{imagoshare.location}}/&amp;media={{asset.serving_url}}&amp;description={{asset | meta:\'title\'}}\" target=\"_blank\" title=\"Pin It\" ng-if=\"imagoshare.pinterest || imagoshare.all\" class=\"fa fa-pinterest\"></a></div>");}]);