var CurrencySymbol;

CurrencySymbol = (function() {
  function CurrencySymbol(imagoUtils) {
    return function(currency) {
      if (!currency) {
        return;
      }
      return imagoUtils.getCurrencySymbol(currency);
    };
  }

  return CurrencySymbol;

})();

angular.module('imago').filter('currencySymbol', ['imagoUtils', CurrencySymbol]);

var Price;

Price = (function() {
  function Price() {
    return function(price) {
      if (_.isUndefined(price)) {
        return '0.00';
      } else {
        price = parseFloat(price);
        price = (price / 100).toFixed(2);
        return price;
      }
    };
  }

  return Price;

})();

angular.module('imago').filter('price', [Price]);

var tagFilter,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

tagFilter = (function() {
  function tagFilter(imagoUtils) {
    return function(input, tag) {
      var asset, filtered, i, j, len, len1, normtags, ref, t, tags;
      if (!input) {
        return;
      }
      if (tag) {
        filtered = [];
        for (i = 0, len = input.length; i < len; i++) {
          asset = input[i];
          tags = imagoUtils.getMeta(asset, 'tags');
          normtags = [];
          for (j = 0, len1 = tags.length; j < len1; j++) {
            t = tags[j];
            normtags.push(imagoUtils.normalize(t));
          }
          if (normtags && (ref = imagoUtils.normalize(tag), indexOf.call(normtags, ref) >= 0)) {
            filtered.push(asset);
          }
        }
        return filtered;
      } else {
        return input;
      }
    };
  }

  return tagFilter;

})();

angular.module('imago').filter('tagFilter', ['imagoUtils', tagFilter]);
