angular.module('waitstaff', [])
    .controller('mainController', function ($scope) {     
        $scope.$on('mealComplete', function (event, data) {
            $scope.$broadcast('calculateCustomerCharges', data);
            $scope.$broadcast('calculateEarnings', data);
        });

        $scope.reset = function () {
            $scope.$broadcast('init');
        };
    })
	.controller('mealDetailsController', function ($scope) {
	    init();

	    $scope.$on('init', function (event, meal) {
	        init();
	    });

	    $scope.submit = function () {
	        $scope.$emit('mealComplete', $scope.meal);
	    }

	    $scope.cancel = function () {
	        init();
	    };

	    function init() {
	        $scope.meal = { baseMealPrice: 0, taxRate: 0, tipPercentage: 0 };
	    };

	})
    .controller('customerChargesController', function ($scope) {
        init();
        $scope.$on('init', function (event, customerCharges) {
            init();
        });

        $scope.$on('calculateCustomerCharges', function (event, meal) {
            var baseMealPrice = meal.baseMealPrice;
			var taxRate = meal.taxRate;
			var tipPercentage = meal.tipPercentage;
			$scope.customerCharges.subtotal = baseMealPrice + (baseMealPrice * (taxRate / 100));
			$scope.customerCharges.tip = baseMealPrice * (tipPercentage / 100);
			$scope.customerCharges.total = $scope.customerCharges.subtotal + $scope.customerCharges.tip;
        });

        function init() {
            $scope.customerCharges = {subtotal: 0, tip: 0, total:0};
        };

    })
    .controller('earningsController', function ($scope) {
        init();
        $scope.$on('init', function (event, earnings) {
            init();
        });

        $scope.$on('calculateEarnings', function (event, meal) {
            var baseMealPrice = meal.baseMealPrice;
            var tipPercentage = meal.tipPercentage;
            $scope.earnings.tipTotal = $scope.earnings.tipTotal + (baseMealPrice * (tipPercentage / 100));
            $scope.earnings.mealCount = $scope.earnings.mealCount + 1;
            $scope.earnings.averageTipPerMeal = $scope.earnings.tipTotal / $scope.earnings.mealCount;
        });

        function init() {
            $scope.earnings = {tipTotal: 0, mealCount: 0, averageTipPerMeal: 0};
        };
    });