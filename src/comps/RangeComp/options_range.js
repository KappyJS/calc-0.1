const options_range = {
    noi:{
        name:"noi",
        max:1000,
        step:10,
        label:"Значение NOI",
        unit:"млн. руб."
    },
    amortization:{
        name:"amortization",
        max:100,
        step:10,
        label:"Амортизация",
        unit:"млн. руб."
    },
    square:{
        name:"square",
        max:100,
        step:10,
        label:"Площадь объекта",
        unit:"тыс. кв. м."
    },
    rate:{
        name:"rate",
        max:15,
        min:5,
        step:0.1,
        label:"Процентная ставка",
        unit:"%"
    }

}
export default options_range