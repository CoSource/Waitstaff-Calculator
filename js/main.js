angular.module('waitstaff', [])
    .controller('mainController', function ($scope) {
        $scope.$broadcast('init');

        $scope.$on('mealComplete', function (baseMealPrice, taxRate, tipPercentage) {
            $scope.$broadcast('calculateCustomerCharges', baseMealPrice, taxRate, tipPercentage);
            $scope.$broadcast('calculateEarnings', baseMealPrice, tipPercentage);
        });

        $scope.reset = function () {
            $scope.$broadcast('init');
        };
    })
	.controller('mealDetailsController', function ($scope) {
	    $scope.$on('init', function () {
	        $scope.baseMealPrice = 0;
	        $scope.taxRate = 0;
	        $scope.tipPercentage = 0;
	    });

	    $scope.submit = function () {
	        $scope.$emit('mealComplete', $scope.baseMealPrice, $scope.taxRate, $scope.tipPercentage);
	    }

	    $scope.cancel = function () {
	        init();
	    };

	})
    .controller('customerChargesController', function ($scope) {
        $scope.$on('init', function () {
            $scope.subtotal = 0;
            $scope.tip = 0;
            $scope.total = 0;
        });

        $scope.$on('calculateCustomerCharges', function (baseMealPrice, taxRate, tipPercentage) {
            $scope.subtotal = baseMealPrice + (baseMealPrice % taxRate);
            $scope.tip = baseMealPrice % tipPercentage;
            $scope.total = $scope.subtotal + $scope.tip;
        });

    })
    .controller('earningsController', function ($scope) {
        $scope.$on('init', function () {
            $scope.tipTotal = 0;
            $scope.mealCount = 0;
            $scope.averageTipPerMeal = 0;
        });

        $scope.$on('calculateEarnings', function (baseMealPrice, tipPercentage) {
            $scope.tipTotal = $scope.tipTotal + (baseMealPrice % tipPercentage);
            $scope.mealCount = $scope.mealCount + 1;
            $scope.averageTipPerMeal = $scope.tipTotal / $scope.mealCount;
        });
    });