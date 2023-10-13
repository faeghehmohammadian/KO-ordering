
function SeatReservation(name, initialmeal,initialSalad,initialDrink){
    var self =this;
    self.name=ko.observable('');
    self.meal=ko.observable(initialmeal);
    self.salad=ko.observable(initialSalad);
    self.drink=ko.observable(initialDrink);
    self.formattedPrice=ko.computed(function(){
        var pricemeal=self.meal().price;
        var pricesalad=self.salad().price;
        var pricedrink=self.drink().price;
        return self.name?"$"+(pricedrink+pricemeal+pricesalad).toFixed(2):'None';
    })
}

function ReservationViewModel(){
    var self=this; 
    self.availableMeals=[
        {mealName : 'none',price: 0},
        {mealName : 'Pizza Margarita',price: 5.95},
        {mealName : 'Pizza Peperoni',price: 4.66},
        {mealName : 'Pizza Vegetarian',price: 3.89},
        {mealName : 'Pizza Mixican',price: 4.89}
    ];
    self.availableSalads=[
        {saladName : 'none',price: 0},
        {saladName : 'Greek Salad',price: 2.25},
        {saladName : 'Mixed Salad',price: 1.66},
        {saladName : 'Olivier Salad',price: 2.89}
    ];
    self.availableDrinks=[
        {drinkName : 'none',price: 0},
        {drinkName : 'Pepsi',price: 1.25},
        {drinkName : 'Diet Pepsi',price: 1.66},
        {drinkName : 'Mirinda',price: 1.66},
        {drinkName : '7UP',price: 1.89}
    ];
    self.seats=ko.observableArray([
        new SeatReservation ('', self.availableMeals[0],self.availableSalads[0],self.availableDrinks[0])
    ]);
    self.addSeat=function(){
        self.seats.push(new SeatReservation("","","",""));
    }
    self.deleteSeat=function(seat){
        self.seats.remove(seat)
    }
    self.totalSurcharge=ko.computed(function(){
        var total=0;
        for (var i=0;i<self.seats().length;i++){
            total+=self.seats()[i].meal().price+self.seats()[i].salad().price+self.seats()[i].drink().price;
        }
        return total;
    });
}
ko.applyBindings(new ReservationViewModel());