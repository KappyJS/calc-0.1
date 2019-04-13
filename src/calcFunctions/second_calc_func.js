//PV - метод ПС 
//IPMT - метод ПРПЛТ
//FV - метод БС
//PMT - метод ПЛТ
//Методы  PV, IPMT, FV, PMT  описаны выше, и являются точными копиями функций в Excel.




const excel_economy_func = {

    FV : function (rate, periods, payment, value, type) {
        // eslint-disable-next-line
        var type = (typeof type === 'undefined') ? 0 : type;
        // eslint-disable-next-line
        rate = eval(rate);
        var result;
        if (rate === 0) {
            result = value + payment * periods;
        } else {
            var term = Math.pow(1 + rate, periods);
            if (type === 1) {
                result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
            } else {
                result = value * term + payment * (term - 1) / rate;
            }
        }
        return -result;
    },
    //---------------------------------------------------------------------------
    PMT: function PMT(rate, periods, present, future, type) {
        // eslint-disable-next-line
        var type = (typeof type === 'undefined') ? 0 : type;
        // eslint-disable-next-line
        rate = eval(rate);
        var result;
        if (rate === 0) {
            result = (present + future) / periods;
        } else {
            var term = Math.pow(1 + rate, periods);
            if (type === 1) {
                result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
            } else {
                result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
            }
        }
        return -result;

    },
    //---------------------------------------------------------------------------
    PV:function PV(rate, periods, payment, future, type) {
        // eslint-disable-next-line
        var type = (typeof type === 'undefined') ? 0 : type;
        // eslint-disable-next-line
        rate = eval(rate);
        // eslint-disable-next-line
        periods = eval(periods);

        if (rate === 0) {
            return -payment * periods - future;
        } else {
            return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
        }
    },
    //---------------------------------------------------------------------------
    IPMT(rate, period, periods, present, future, type) {
        // eslint-disable-next-line
        var type = (typeof type === 'undefined') ? 0 : type;
        // eslint-disable-next-line
        rate = eval(rate);
        // eslint-disable-next-line
        periods = eval(periods);
        var payment = this.PMT(rate, periods, present, future, type);
        var interest;
        if (period === 1) {
            if (type === 1) {
                interest = 0;
            } else {
                interest = -present;
            }
        } else {
            if (type === 1) {
                interest = this.FV(rate, period - 2, payment, present, 1) - payment;
            } else {
                interest = this.FV(rate, period - 1, payment, present, 0);
            }
        }
        return interest * rate;
    }

    
}
//Функция расчета, аналогична расчетам в исходном файле Excel , поделенном на 6 этапов(для удобства и отлаживания)

export default function calcCredit(baloon,noi,amortization,nalog,index,dscr,rate){
    
var firstvalue,secondvalue,thirdvalue,fourthvalue,fivevalue,sixvalue,total;

const periods = 20;
 baloon = baloon / 100;
const amortizationperiod = 13 * 4;
const period = 40;
const tmp = 7;
const sum = summary();
firstCalc();
secondCalc();
thirdCalc();
fourthCalc();
fiveCalc();
sixCalc();

return {total,baloon,dscr};


   function firstCalc() {
        if (baloon === 0) {
            firstvalue = -excel_economy_func.PV(rate / 4, amortizationperiod, ((sum / 4 + sum / 4 * Math.pow((1 + index), periods)) / 2 / dscr), 0, 0);
        } else firstvalue = -excel_economy_func.PV(rate / 4, amortizationperiod, ((sum / 4 + sum / 4 * Math.pow((1 + index), 8)) / 2 / dscr), 0, 0);
    }

    function  secondCalc() {
        secondvalue = -excel_economy_func.PV(rate / 4, period, ((sum / 4 + sum / 4 * Math.pow((1 + index), tmp)) / 2 / dscr), firstvalue * baloon, 0);
    }

    function  thirdCalc() {
        thirdvalue = -excel_economy_func.PV(rate / 4, period, ((sum / 4 + sum / 4 * Math.pow((1 + index), tmp)) / 2 / dscr), secondvalue * baloon, 0);
    }

    function fourthCalc() {
        let first = ((noi / 4 * Math.pow((1 + index), tmp) - ((noi / 4 * Math.pow((1 + index), tmp)) - excel_economy_func.IPMT(rate / 4, tmp * 4, period, thirdvalue * -1, thirdvalue * baloon, 0) - amortization / 4) * nalog) * 4)
        let second = (noi - (noi - thirdvalue * rate - amortization) * nalog)
        let plt = (second + first) / 2 / 4 / dscr
        fourthvalue = excel_economy_func.PV(rate / 4, amortizationperiod, -plt, 0, 0)
    }


    function fiveCalc() {
        let first = ((noi / 4 * Math.pow((1 + index), tmp) - ((noi / 4 * Math.pow((1 + index), tmp)) - excel_economy_func.IPMT(rate / 4, tmp * 4, period, thirdvalue * -1, thirdvalue * baloon, 0) - amortization / 4) * nalog) * 4)
        let second = (noi - (noi - thirdvalue * rate - amortization) * nalog)
        let plt = (second + first) / 2 / 4 / dscr
        fivevalue = excel_economy_func.PV(rate / 4, period, -plt, -fourthvalue * baloon, 0)
    }

    function  sixCalc() {
        let first = ((noi / 4 * Math.pow((1 + index), tmp) - ((noi / 4 * Math.pow((1 + index), tmp)) - excel_economy_func.IPMT(rate / 4, tmp * 4, period, thirdvalue * -1, thirdvalue * baloon, 0) - amortization / 4) * nalog) * 4)
        let second = (noi - (noi - thirdvalue * rate - amortization) * nalog)
        let plt = (second + first) / 2 / 4 / dscr
        sixvalue = excel_economy_func.PV(rate / 4, period, -plt, -fivevalue * baloon, 0)
        total = sixvalue;
    }

    function summary  ()  {

        return  (noi - (noi - amortization) * nalog);
    }



    
}



