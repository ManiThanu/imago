var imagoContact;

imagoContact = (function() {
  function imagoContact(imagoSubmit) {
    return {
      replace: true,
      scope: {},
      templateUrl: '/imago/contactWidget.html',
      controller: function($scope) {
        return $scope.submitForm = (function(_this) {
          return function(isValid) {
            if (isValid) {
              return imagoSubmit.send($scope.contact);
            }
          };
        })(this);
      }
    };
  }

  return imagoContact;

})();

angular.module('imago').directive('imagoContact', ['imagoSubmit', imagoContact]);

angular.module("imago").run(["$templateCache", function($templateCache) {$templateCache.put("/imago/contactWidget.html","<div class=\"nex form\"><form name=\"nexContact\" ng-submit=\"submitForm(nexContact.$valid)\" novalidate=\"novalidate\"><div class=\"nex field\"><label for=\"name\">Name</label><input type=\"text\" name=\"name\" ng-model=\"contact.name\" placeholder=\"Name\" require=\"require\"/></div><div class=\"nex field\"><label for=\"email\">Email</label><input type=\"email\" name=\"email\" ng-model=\"contact.email\" placeholder=\"Email\" require=\"require\"/></div><div class=\"nex field\"><label for=\"message\">Message</label><textarea name=\"message\" ng-model=\"contact.message\" placeholder=\"Your message.\" require=\"require\"></textarea></div><div class=\"nex checkbox\"><input type=\"checkbox\" name=\"subscribe\" ng-model=\"contact.subscribe\" checked=\"checked\"/><label for=\"subscribe\">Subscribe</label></div><div class=\"formcontrols\"><button type=\"submit\" ng-disabled=\"nexContact.$invalid\" class=\"send\">Send</button></div></form><div class=\"sucess\"><span>Thank You!</span></div><div class=\"error\"><span>Error!</span></div></div>");}]);