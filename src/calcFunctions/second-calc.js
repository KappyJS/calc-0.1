
function calculate (ownBalance){
/** 
* currentCreditBalance Cell : B3 - Текущий остаток по кредиту (если имеется) 
**/
const  currentCreditBalance = 200 
     /** 
  Cell : D3 - Всего строительный бюджет, млн. руб 
**/
const    buildingCapital = 4828.6 
     /** 
  Cell : E3 - Остаток бюджета к дофинансированию, млн. руб 
**/
const   buildingCapitalLeft = 4128.6 
     /** 
  Cell : G3 - Фактически продано площадей объекта, млн. рублей
**/
const   actuallySold = 500 
     /** 
  Cell : H3 - Остаток нереализованных площадей, кв.м.
**/
const    notSoldLeft =43740.4075  
     /** 
  Cell : I3 buildTimeLeft -  Оставшийся срок строительства (инвестиционной фазы), кварталов 
**/
const   buildTimeLeft = 12   
     /** 
  Cell : J3 - Фактическая текущая стоимость продажи 1 кв. м. площадей объекта, млн. руб 
**/
const   priceMeterActually = 0.135 
     /** 
  Cell : K3 - Ожидаемая стоимость реализации 1 кв.м условно готовой площади объекта, млн. руб
**/
const  priceMeterExpected = 0.1698 
     /** 
  Cell : L3 -  Фактическое количество продаваемых метров в квартал, кв.м 
**/
const   soldMetersPerQuarter = 3500 
     /** 
  Cell : N3 - Схема (0 / 1 / 2) 
**/
const   scheme = 0 
     /** 
  Cell : B4 - Отсрочка от уплаты? ( 0/1 )
**/
const   postPayment = 0
     /** 
  *Cell : B5 - Схема продаж:
*1 - смешанная с предстоящими продажами до 01.07.2019
*0- смешанная без предстоящих продаж до 01.07.2019 / эскроу  
**/
const    paymentScheme = 0  
     /** 
  *Cell : W3 -  Коэффициент темпа продаж 
**/
const   tempSaleIndex = 1  
     /** 
  Cell : X3 -  Коэффициент стоимости продажи 
**/
const   costSaleIndex = 1  
     /** 
  Cell : AA : FU - Главный рассчет 
**/
const   periodAmount = 150 
     /** 
  Cell : O3 -  Базовая ставка 
**/
const   baseRate = 0.11 
     /** 
  Cell : P3 - Специальная ставка 
**/
const   specialRate = 0.05 
     /** 
  Cell : Q3 - Доля продаж с кредитами Сбербанка 
**/
const   salePartBankCreddits = 0.5 
          /**
   Cell : B9 - Доля продаж с кредитами Сбербанка 
  Ставка дисконтирования: 
1- есть РС
2 -есть ИРД
3 - нет ИРД
**/
const   rateDiscontParam = 1


/*
const {
        currentCreditBalance,
        buildingCapital,
        buildingCapitalLeft,
        actuallySold,
        notSoldLeft,
        buildTimeLeft,
        priceMeterActually,
        priceMeterExpected,
        soldMetersPerQuarter,
        scheme,
        postPayment,
        paymentScheme,
        tempSaleIndex,
        costSaleIndex,
        baseRate,
        periodAmount,
        specialRate,
        salePartBankCreddits,
        rateDiscontParam
    } = state
    */


/** 
Cell : F3 -  В том числе. остаток к дофинансированию за счет продаж 
**/
const buildingCapitalLeftSale = (()=>{  
    if (paymentScheme===0)
    return 0
    if(dateIsEqual()>=0)
    return dateIsEqual() * soldMetersPerQuarter * priceMeterActually / 91 / tempSaleIndex * costSaleIndex
    return 0
    
    })() 


/** 
Cell : B22 -  Остатков на эскроу на конец инвест фазы 
**/
const escrow = (priceMeterActually + priceMeterExpected) / 2 * soldMetersPerQuarter / tempSaleIndex * costSaleIndex * Math.min(Math.round(buildTimeLeft),notSoldLeft / soldMetersPerQuarter)-  buildingCapitalLeftSale 
/** 
Cell : C3 -  Невыбранный лимит кредита 
**/
const notSelectedCreditLimit = buildingCapitalLeft - ownBalance - buildingCapitalLeftSale; 

/** 
Cell : R3 - Специальная ставка (применяется к долгу, покрытому средствами на счетах эскроу в размере сумм ипотеки ПАО Сбербанк)
**/
const specialRate2 = (()=>{
  if (scheme===0)
   return specialRate;
    if(scheme===1)
    return baseRate;
     if(scheme===2)
      return (baseRate - (baseRate-specialRate) / 2)
      
  
  })()
  /** 
Cell : S3 - Специальная ставка (применяется к долгу, покрытому средствами на счетах эскроу, кроме сумм ипотеки ПАО Сбербанк)
**/
const specialRate3 = specialRate;
/** 
Cell : M3 - Отавшийся срок продажи квартир при текущем темпе с учетом возможного увеличения на коэффициент
**/
const roomSaleTime = notSoldLeft/soldMetersPerQuarter * tempSaleIndex ;

/** 
Cell : O4 - Дополнительная ставка
**/
const baseRateExtra = ((baseRate/12*Math.pow((1+baseRate),(1/12*buildTimeLeft*3-1/12))*Math.pow((1+baseRate),(1/12))-baseRate/12)/(Math.pow((1+baseRate),(1/12))-1)-baseRate/12*buildTimeLeft*3)/(buildTimeLeft/4)
 
/** 
Cell : R4 - Дополнительная ставка
**/
const specialRateExtra = (((specialRate2/12*Math.pow((1+baseRate),(1/12*buildTimeLeft*3-1/12))*Math.pow((1+baseRate),(1/12))-specialRate2/12)/(Math.pow((1+baseRate),(1/12))-1)-specialRate2/12*buildTimeLeft*3)/(buildTimeLeft/4))

/** 
Cell : S4 - Дополнительная ставка
**/
const specialRateExtra2 = (((specialRate3/12*Math.pow((1+baseRate),(1/12*buildTimeLeft*3-1/12))*Math.pow((1+baseRate),(1/12))-specialRate3/12)/(Math.pow((1+baseRate),(1/12))-1)-specialRate3/12*buildTimeLeft*3)/(buildTimeLeft/4))

/** 
Cell : B23 - сумма доп доходов в виде разницы % по эскроу и базовой ставки
**/
const sumExtraWithDraw  = postPayment * 
Math.min(
 ( ((priceMeterActually+priceMeterExpected)/2*soldMetersPerQuarter/tempSaleIndex*costSaleIndex*1*(((baseRate+baseRateExtra*postPayment)-(specialRate2+specialRateExtra*postPayment))*salePartBankCreddits+((baseRate+baseRateExtra*postPayment)-(specialRate3+specialRateExtra2*postPayment))*(1-salePartBankCreddits))/4)*(1+buildTimeLeft)*buildTimeLeft/2),
  ((buildingCapitalLeft-ownBalance-buildingCapitalLeftSale)/buildTimeLeft*((baseRate+baseRateExtra*postPayment))/4*1*(1+buildTimeLeft)*buildTimeLeft/2+currentCreditBalance*((baseRate+baseRateExtra*postPayment))/4*buildTimeLeft)
)


/** 
Cell : B24 - ОСЗ по базовой ставке без вычета остатков на эскроу и доп доходов в виде разницы %% по эскроу и базовой ставки
**/
const oszBase  = (1>Math.floor(buildTimeLeft)?0:Math.min(notSelectedCreditLimit,buildingCapitalLeft-buildingCapitalLeftSale)/buildTimeLeft)
* (((1+Math.floor(buildTimeLeft))/2*Math.floor(buildTimeLeft)*(baseRate+baseRateExtra*postPayment)/4)*postPayment+Math.floor(buildTimeLeft))
+((1>Math.floor(buildTimeLeft)?0:currentCreditBalance)*(Math.floor(buildTimeLeft)*(baseRate+baseRateExtra*postPayment)/4*postPayment+1))



/** 
Cell : B25 - ОСЗ после вычетов эскроу и дельты процентов
**/
const oszAfter = oszBase - sumExtraWithDraw - escrow

/** 
Cell : B26 - Платеж на эксплуатационной фазе в квартал
**/
const exploitPayment = oszAfter<=0?0: PMT(baseRate/4,roomSaleTime-buildTimeLeft,-oszAfter,0,0)
 
/** 
Cell : B27 - DSCR на эксплуатационной фазе
**/
const exploitDSCR = (priceMeterExpected*soldMetersPerQuarter/tempSaleIndex*costSaleIndex*(roomSaleTime-buildTimeLeft))/(exploitPayment<=0?0.01:exploitPayment*(roomSaleTime-buildTimeLeft))



/**
   Cell : C9 - Ставка дисконта 
**/
const rateDiscont = (rateDiscontParam===1?0.2:(rateDiscontParam===2?0.25:0.3)) 
    /** 
     * Cells {AA3:FU3} - Главная обработка значений
     **/
const arrAA_FU3 = (()=>
{
    const arr = [];
   
    arr.push(-currentCreditBalance + (ownBalance<0?ownBalance:0))
    for(let i=1;i<=periodAmount;i++){
        
        let firstCalc = -(i > Math.floor(buildTimeLeft)?0:(buildingCapitalLeftSale/buildTimeLeft))
        let secondCalc = (i > Math.floor(buildTimeLeft)?0:(Math.min(notSelectedCreditLimit,buildingCapitalLeft-buildingCapitalLeftSale)/buildTimeLeft))
        let thirdCalc =     (i <= Math.floor(buildTimeLeft)?  (postPayment===0?0:0)  +7777777*0 : ( 
            Math.floor(buildTimeLeft)+1===i?( 
               ( priceMeterActually + priceMeterExpected) / 2 * soldMetersPerQuarter / tempSaleIndex * costSaleIndex *
                 ((notSoldLeft / (soldMetersPerQuarter / tempSaleIndex))<Math.floor(buildTimeLeft)?
                 (notSoldLeft / (soldMetersPerQuarter / tempSaleIndex)):Math.floor(buildTimeLeft))  
                   + (((notSoldLeft / (soldMetersPerQuarter / tempSaleIndex))<Math.floor(buildTimeLeft)||Math.floor(notSoldLeft / (soldMetersPerQuarter / tempSaleIndex))<=Math.floor(buildTimeLeft)+1)?
                   0:priceMeterExpected * soldMetersPerQuarter / tempSaleIndex * costSaleIndex )):0)) 


let fourthIf =   ((i<notSoldLeft/(soldMetersPerQuarter / tempSaleIndex))&&((notSoldLeft / (soldMetersPerQuarter / tempSaleIndex))>=Math.floor(buildTimeLeft)))
let fourthFirstParam = (i>Math.floor(buildTimeLeft)+1 ?  priceMeterExpected * soldMetersPerQuarter / tempSaleIndex * costSaleIndex : 0)
let fourthSecondParam = ((notSoldLeft/(soldMetersPerQuarter/tempSaleIndex))<(Math.floor(buildTimeLeft)+1)) ? 0 : (i===Math.floor(notSoldLeft / (soldMetersPerQuarter / tempSaleIndex))+1?(priceMeterExpected * soldMetersPerQuarter / tempSaleIndex * costSaleIndex*(roomSaleTime-i+1)):0)
let fourthCalc = fourthIf?fourthFirstParam:fourthSecondParam

let value = firstCalc - secondCalc + thirdCalc + fourthCalc
arr.push ( value)
}
    return arr
}
)()


/** 
Cell : B29 - Доход на эксплуатационной фазе в квартал
**/
const exploitIncome = (arrAA_FU3.reduce((sum,cur,index)=>index>=buildTimeLeft+2?sum+cur:0) + (oszAfter<0?-oszAfter:0))

/** 
Cell : B33 - сумма платежей с DSCR 1,2
**/
const sumDSCRPaymnets = (exploitPayment<0?0.01:exploitPayment*(roomSaleTime-buildTimeLeft))*1.2;


/** 
Cell : B31 - дельта 50% для кредита под будущую прибыль
**/
const deltaCreditPercent = (exploitIncome-sumDSCRPaymnets)*0.5

/** 
 * Cells {AA11:FU11} - Рассчет стоимости
**/
  const  arrAA_FU11 = (()=>{

    const arr = [];
   
    arr.push(-(buildingCapital-buildingCapitalLeft)+actuallySold)
    for(let i=1;i<=periodAmount;i++){
        
        let firstCalc = -(i > Math.floor(buildTimeLeft)?0:(buildingCapitalLeft/buildTimeLeft))
        //let secondCalc = (i > Math.floor(buildTimeLeft)?0:(Math.min(notSelectedCreditLimit,buildingCapitalLeft-buildingCapitalLeftSale)/buildTimeLeft))
        let thirdCalc =     (i <= Math.floor(buildTimeLeft)?7777777*0 : ( 
            Math.floor(buildTimeLeft)+1===i?( 
               ( priceMeterActually + priceMeterExpected) / 2 * soldMetersPerQuarter / tempSaleIndex * costSaleIndex *
                 ((notSoldLeft / (soldMetersPerQuarter / tempSaleIndex))<Math.floor(buildTimeLeft)?
                 (notSoldLeft / (soldMetersPerQuarter / tempSaleIndex)):Math.floor(buildTimeLeft))  
                   + (((notSoldLeft / (soldMetersPerQuarter / tempSaleIndex))<Math.floor(buildTimeLeft)||Math.floor(notSoldLeft / (soldMetersPerQuarter / tempSaleIndex))<=Math.floor(buildTimeLeft)+1)?
                   0:priceMeterExpected * soldMetersPerQuarter / tempSaleIndex * costSaleIndex )):0)) 


let fourthIf =   ((i<notSoldLeft/(soldMetersPerQuarter / tempSaleIndex))&&((notSoldLeft / (soldMetersPerQuarter / tempSaleIndex))>=Math.floor(buildTimeLeft)))
let fourthFirstParam = (i>Math.floor(buildTimeLeft)+1 ?  priceMeterExpected * soldMetersPerQuarter / tempSaleIndex * costSaleIndex : 0)
let fourthSecondParam = ((notSoldLeft/(soldMetersPerQuarter/tempSaleIndex))<(Math.floor(buildTimeLeft)+1)) ? 0 : (i==Math.floor(notSoldLeft / (soldMetersPerQuarter / tempSaleIndex))+1?(priceMeterExpected * soldMetersPerQuarter / tempSaleIndex * costSaleIndex*(roomSaleTime-i+1)):0)
let fourthCalc = fourthIf?fourthFirstParam:fourthSecondParam
let value = firstCalc  + thirdCalc + fourthCalc;
arr.push ( value)
}

    return arr
}
  )()

/** 
 * Cells {AA10:FU10} - Рассчет стоимости
**/
  const  arrAA_FU10 = (()=>{

    const arr = [];
   
    arr.push(-(buildingCapital-buildingCapitalLeft)+actuallySold)
    for(let i=1;i<=periodAmount;i++){
        
        let firstCalc = -(i > Math.floor(buildTimeLeft)?0:(buildingCapitalLeft/buildTimeLeft))
        let thirdCalc =     (i <= Math.floor(buildTimeLeft)?7777777*0 : ( 
            Math.floor(buildTimeLeft)+1===i?( 
               ( priceMeterActually + priceMeterExpected) / 2 * soldMetersPerQuarter  *
                 ((notSoldLeft / (soldMetersPerQuarter ))<Math.floor(buildTimeLeft)?
                 (notSoldLeft / (soldMetersPerQuarter)):Math.floor(buildTimeLeft))  
                   + (((notSoldLeft / (soldMetersPerQuarter ))<Math.floor(buildTimeLeft)||Math.floor(notSoldLeft / (soldMetersPerQuarter ))<=Math.floor(buildTimeLeft)+1)?
                   0:priceMeterExpected * soldMetersPerQuarter)):0)) 


let fourthIf =   ((i<notSoldLeft/(soldMetersPerQuarter ))&&((notSoldLeft / (soldMetersPerQuarter ))>=Math.floor(buildTimeLeft)))
let fourthFirstParam = (i>Math.floor(buildTimeLeft)+1 ?  priceMeterExpected * soldMetersPerQuarter : 0)
let fourthSecondParam = ((notSoldLeft/(soldMetersPerQuarter))<(Math.floor(buildTimeLeft))) ? 0 : (i===Math.floor(notSoldLeft / soldMetersPerQuarter )+1?(priceMeterExpected * soldMetersPerQuarter*(notSoldLeft/soldMetersPerQuarter-i+1)):0)
let fourthCalc = fourthIf?fourthFirstParam:fourthSecondParam
let value = firstCalc  + thirdCalc + fourthCalc;
arr.push ( value)

}

    return arr
}
  )()


/** 
 * Cells {AA14:FU14} - Рассчет выборки
**/
    const arrAA_FU14 = (()=>{
       const arr = [];
   
      arr.push(-(currentCreditBalance+(ownBalance<0?ownBalance:0)))
      for(let i=1;i<=periodAmount;i++){
      let value = -( i>Math.floor(buildTimeLeft)?0:(buildingCapitalLeft-ownBalance-buildingCapitalLeftSale)/buildTimeLeft);
      arr.push(value)  
    }
    
      return arr;
    })()



        /** 
 * Cells {AA22:FU22} - Проценты по базовой ставке
**/
const arrAA_FU22 = (()=>{
  const arr = [];


 for(let i=1;i<=periodAmount;i++){
let value = (buildingCapitalLeft-ownBalance-buildingCapitalLeftSale)/buildTimeLeft*((baseRate+baseRateExtra*postPayment))/4*i+currentCreditBalance*((baseRate+baseRateExtra*postPayment))/4
 arr.push(value)  
}

 return arr;
})()



    /** 
 * Cells {AA23:FU23} - Дельта проценты по эскроу с учетом чувствительности
**/
const arrAA_FU23 = (()=>{
  const arr = [];

 for(let i=1;i<=periodAmount;i++){
  let first_value =  (priceMeterActually+priceMeterExpected)/2*soldMetersPerQuarter/tempSaleIndex*costSaleIndex*i*(((baseRate+baseRateExtra*postPayment)-(specialRate2+specialRateExtra*postPayment))*salePartBankCreddits+((baseRate+baseRateExtra*postPayment)-(specialRate3+specialRateExtra2*postPayment))*(1-salePartBankCreddits))/4
  let second_value = (buildingCapitalLeft-ownBalance-buildingCapitalLeftSale)/buildTimeLeft*((baseRate+baseRateExtra*postPayment))/4*i+currentCreditBalance*((baseRate+baseRateExtra*postPayment))/4
  let value = Math.min(first_value,second_value)
 arr.push(value)  
}

 return arr;
})()


    /** 
 * Cells {AA15:FU15} - Погашение
**/
const arrAA_FU15 = (()=>{
  const arr = [];
 arr.push(0)
 for(let i=1;i<=periodAmount;i++){

 let first_value = (i<=Math.ceil(notSoldLeft/soldMetersPerQuarter/tempSaleIndex))? 
 (i>Math.floor(buildTimeLeft)+1)?
 (i===Math.ceil(notSoldLeft/soldMetersPerQuarter/tempSaleIndex))?
 (exploitPayment<0?0:exploitPayment)*(notSoldLeft/soldMetersPerQuarter/tempSaleIndex-(i-1)) : (exploitPayment<0?0:exploitPayment)
 : ((buildTimeLeft+1)===i)? Math.min(escrow,oszBase-sumExtraWithDraw) + (exploitPayment<0?0:exploitPayment) :0
 :0
 let second_value = (Math.ceil(notSoldLeft/soldMetersPerQuarter/tempSaleIndex)<=Math.floor(buildTimeLeft))? 
1===(Math.floor(buildTimeLeft) +1)? Math.min(escrow,oszBase-sumExtraWithDraw) + (exploitPayment<0?0:exploitPayment) :0
 :0

let third_value = ((postPayment===0)&&(i<=buildTimeLeft))?(arrAA_FU22[i-1]-arrAA_FU23[i-1]) :0



   let value =  first_value + second_value + third_value
   arr.push(value)  
}

 return arr;
})()



   /** 
 * Cells {AA16:FU16} - Погашение
**/
const arrAA_FU16 = (()=>{
  const arr = [];
 for(let i=0;i<=periodAmount;i++){
   arr.push(arrAA_FU15[i]+arrAA_FU14[i])  
  
}

 return arr;
})()

  /** 
     * Cell: B10 - Оценка земельного участка
     **/
    const landPrice = NPV(Math.pow(1+rateDiscont,0.25)-1,arrAA_FU10.slice(1,arrAA_FU10.length)) + arrAA_FU10[0]
     
 /** 
     * Cell: B11 - Итого бюджет
     **/

    const totalBalance = buildingCapital + Math.min(landPrice<0?0:landPrice,buildingCapital/0.85*0.15)

     /** 
     * Cell: C10 - landPriceSecond
     **/
const landPriceSecond =  Math.min(landPrice<0?0:landPrice,buildingCapital/0.85*0.15)
 /** 
     * Cell: B13 - Первый баланс
     **/
    const ownBalanceFirst = buildingCapital -  buildingCapitalLeft - currentCreditBalance - actuallySold +ownBalance + landPriceSecond


/**
 * Cell: B14 - Дольщики
 **/
const investors = actuallySold + buildingCapitalLeftSale;

/**
 * Cell: B15 - Банковский кредит
 **/
const bankCredit = totalBalance - ownBalanceFirst - investors



 /**
 * Cell: U3 - СТАВКА ПО КРЕДИТУ
 **/

const creditRate = IRR(arrAA_FU16)*4



 /**
 * Cell: Y3 - СТАВКА ПО КРЕДИТУ
 **/

// eslint-disable-next-line no-unused-vars
const bankCreditRate = IRR(arrAA_FU3)*4

/** 
Cell : B34 - Итого сумма старшего долга и кредита под будущую прибыль
**/

const totalSum = (deltaCreditPercent+bankCredit)

 /** 
     * Cell: D13 - Собственный бюджет(отношение)
     **/

    const ownBalancePerc = ownBalanceFirst/totalBalance
 /** 
     * Cell: D14 - Доля(отношение)
     **/

    const investorsPerc = investors/totalBalance
 /** 
     * Cell: D15 - Банковскйи крдети(отношение)
     **/

    const bankCreditPerc = bankCredit/totalBalance


 /** 
     * Cell: B6 - Залоговый дисконт
     **/
    const discontDeposit = (roomSaleTime-buildTimeLeft)>=12?0.35:(roomSaleTime-buildTimeLeft)>=8?0.3:0.25

 /** 
     * Cell: B7 - Залоговая стоимость обеспечения:
     **/

      const depositCost = notSoldLeft*priceMeterExpected*(1-discontDeposit)


       /** 
     * Cell: B17 - Собственные средства на уплату процентов:
     **/

    const ownPercBalance = (postPayment===0)?((1>Math.floor(buildTimeLeft)?0:Math.min(notSelectedCreditLimit,buildingCapitalLeft-buildingCapitalLeftSale)) 
    *(((1+Math.floor(buildTimeLeft))/2*Math.floor(buildTimeLeft)*(baseRate+baseRateExtra*postPayment)/4))
    +((1>Math.floor(buildTimeLeft)?0:currentCreditBalance)*((Math.floor(buildTimeLeft)*(baseRate+baseRateExtra*postPayment)/4)))
    -Math.min(((((priceMeterActually+priceMeterExpected)/2*soldMetersPerQuarter/tempSaleIndex*costSaleIndex*(((baseRate+baseRateExtra*postPayment))-(specialRate2+specialRateExtra*postPayment))*salePartBankCreddits+((baseRate+baseRateExtra*postPayment))-(specialRate3+specialRateExtra2*postPayment))*(1-salePartBankCreddits))/4)
    ,(((buildingCapitalLeft-ownBalance-buildingCapitalLeftSale+currentCreditBalance)/buildTimeLeft*((baseRate+baseRateExtra*postPayment)))/4))
    *(buildTimeLeft+1)*buildTimeLeft/2)
    :0


/** 
 * Функция ВСД() из Excel - Показатель внутренней нормы доходности инвестиционного проекта.
 * @param values - Массив чисел
 * @param guess - Ссылка на число
*/
    function IRR(values, guess) {
        // Credits: algorithm inspired by Apache OpenOffice
        
        // Calculates the resulting amount
        var irrResult = function(values, dates, rate) {
          var r = rate + 1;
          var result = values[0];
          for (var i = 1; i < values.length; i++) {
            result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
          }
          return result;
        }
      
        // Calculates the first derivation
        var irrResultDeriv = function(values, dates, rate) {
          var r = rate + 1;
          var result = 0;
          for (var i = 1; i < values.length; i++) {
            var frac = (dates[i] - dates[0]) / 365;
            result -= frac * values[i] / Math.pow(r, frac + 1);
          }
          return result;
        }
      
        // Initialize dates and check that values contains at least one positive value and one negative value
        var dates = [];
        var positive = false;
        var negative = false;
        for (var i = 0; i < values.length; i++) {
          dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
          if (values[i] > 0) positive = true;
          if (values[i] < 0) negative = true;
        }
        
        // Return error if values does not contain at least one positive value and one negative value
        if (!positive || !negative) return '#NUM!';
      
        // Initialize guess and resultRate
         guess = (typeof guess === 'undefined') ? 0.1 : guess;
        var resultRate = guess;
        
        // Set maximum epsilon for end of iteration
        var epsMax = 1e-10;
        
        // Set maximum number of iterations
        var iterMax = 150;
      
        // Implement Newton's method
        var newRate, epsRate, resultValue;
        var iteration = 0;
        var contLoop = true;
        do {
          resultValue = irrResult(values, dates, resultRate);
          newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
          epsRate = Math.abs(newRate - resultRate);
          resultRate = newRate;
          contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
        } while(contLoop && (++iteration < iterMax));
      
        if(contLoop) return '#NUM!';
      
        // Return internal rate of return
        return resultRate;
      }


      function dateIsEqual(){
          const nowDate = new Date()  // Now Date
          const endDate = new Date(2019,6,1)  // 1 Jul
          return Math.ceil((endDate-nowDate)/1000/60/60/24)
      }

    
     
/**
 * Calculates the Net Present Value of a given initial investment
 * cost and an array of cash flow values with the specified discount rate.
 *
 * @param {number} rate - The discount rate percentage
 * @param {number} initialCost - The initial investment
 * @param {array} cashFlows - An array of future payment amounts
 * @return {number} The calculated Net Present Value
 */
function NPV(rate,cashFlows)  {
  let npv = 0;;
  for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(1 + rate, i+1);
  }
  return Math.round(npv * 100) / 100;
}
function PMT(ir, np, pv, fv, type) {
  /*
   * ir   - interest rate per month
   * np   - number of periods (months)
   * pv   - present value
   * fv   - future value
   * type - when the payments are due:
   *        0: end of the period, e.g. end of month (default)
   *        1: beginning of period
   */
  var pmt, pvif;

  fv || (fv = 0);
  type || (type = 0);

  if (ir === 0)
      return -(pv + fv)/np;

  pvif = Math.pow(1 + ir, np);
  pmt = - ir * pv * (pvif + fv) / (pvif - 1);

  if (type === 1)
      pmt /= (1 + ir);

  return pmt;
}
/*
console.log("__________________________________________")
console.log("currentCreditBalance(B3) : ",currentCreditBalance);
console.log("notSelectedCreditLimit(C3) : ",notSelectedCreditLimit);
console.log("buildingCapital(D3) : ",buildingCapital);
console.log("buildingCapitalLeft(E3) : ",buildingCapitalLeft);
console.log("buildingCapitalLeftSale(F3) : ",buildingCapitalLeftSale);
console.log("actuallySold(G3) : ",actuallySold);
console.log("notSoldLeft(H3) : ",notSoldLeft);
console.log("buildTimeLeft(I3) : ",buildTimeLeft);
console.log("priceMeterActually(J3) : ",priceMeterActually);
console.log("priceMeterExpected(K3) : ",priceMeterExpected);
console.log("soldMetersPerQuarter(L3) : ",soldMetersPerQuarter);
console.log("roomSaleTime(M3) : ",roomSaleTime);
console.log("scheme(N3) : ",scheme);
console.log("baseRate(O3) : ",baseRate);
console.log("specialRate(P3) : ",specialRate);
console.log("salePartBankCreddits(Q3) : ",salePartBankCreddits);
console.log("specialRate2(R3) : ",specialRate2);
console.log("specialRate3(S3) : ",specialRate3);
console.log("paymentScheme(B5) : ",paymentScheme);
console.log("tempSaleIndex(W3) : ",tempSaleIndex);
console.log("costSaleIndex(X3) : ",costSaleIndex);
console.log("periodAmount(AA:FU(Col)) : ",periodAmount);
console.log("rateDiscontParam(B9) : ",rateDiscontParam);
console.log("ownBalance(C13) : ",ownBalance);
console.log("escrow(B22) : ",escrow);
console.log("baseRateExtra(O4) : ",baseRateExtra);
console.log("sumExtraWithDraw(B23) : ",sumExtraWithDraw);
console.log("rateDiscont(C9) : ",rateDiscont);
console.log("specialRateExtra2(S4) : ",specialRateExtra2);
console.log("specialRateExtra(R4) : ",specialRateExtra);

console.log("arrAA_FU3({AA:FU3}) : ",arrAA_FU3);
console.log("arrAA_FU11({AA:FU11}) : ",arrAA_FU11);

console.log("arrAA_FU14({AA14:FU14}) : ",arrAA_FU14);
console.log("arrAA_FU22({AA22:FU22}) : ",arrAA_FU22);

console.log("arrAA_FU10({AA:FU10}) : ",arrAA_FU10);
console.log("landPrice(B10) : ",landPrice);
console.log("postPayment(B4) : ",postPayment);
console.log("totalBalance(B11) : ",totalBalance);
console.log("totalSum(B34) : ",totalSum);
*/

return({
  totalSum,
  ownBalance,
  landPrice,
  investors,
  bankCredit,
  ownBalancePerc,
  investorsPerc,
  bankCreditPerc,
  deltaCreditPercent,
  creditRate,
  totalBalance,
  notSelectedCreditLimit,
  depositCost,
  currentCreditBalance,
  exploitDSCR,
  ownPercBalance




})





}


var result
var max=0 
for (let i = -10000; i<10000;i+=1){   
 result =  calculate(i)
 if ((result.notSelectedCreditLimit>max)&&(result.exploitDSCR>=1.3)&&(result.notSelectedCreditLimit<= (result.depositCost - result.currentCreditBalance))&&(result.ownBalancePerc>=0.15))
 max = result
}

console.log(max)

