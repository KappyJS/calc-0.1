import calcCredit from './second_calc_func'

export default function calculateTotal(state) {
  // eslint-disable-next-line
  const {
    build_type,
    first_class,
    bonus_rate,
    value
  } = state;
const     nalog_rate = +state.nalog_rate/100
  const {
    noi,
    amortization,
    square
  } = value

const rate = value.rate/100;
  const indexvalue = state.index / 100;
  var  result;



  switch (build_type) {
    case "Офисный":
      {
        //Первоклассный для Офиса
        if (first_class) {
          const dscr = 1.2;
          result = capsuleCalc(50,70,dscr,noi,amortization,nalog_rate,indexvalue,rate);
         
        }
        //Не первоклассный
        else {
          const dscr = 1.3;
          result = capsuleCalc(30,50,dscr,noi,amortization,nalog_rate,indexvalue,rate);
        }
        break;



      }
    case "Складской":
      {
        //Первоклассный для Складской
        if ((first_class) && (square > 50)) {

          const dscr = 1.2;
        
          result = capsuleCalc(30,70,dscr,noi,amortization,nalog_rate,indexvalue,rate);
        }
        //Не первоклассный
        else {
          const dscr = 1.3;

          result = capsuleCalc(30,70,dscr,noi,amortization,nalog_rate,indexvalue,rate);
        }
        break;
      }
      //Для Автосалона одно значение
    case "Автосалон":
      const dscr = 1.4;
  
      result = capsuleCalc(0,70,dscr,noi,amortization,nalog_rate,indexvalue,rate);
    
      break;
    case "Торговый":
      {
        if (first_class) {
          const dscr = 1.2;
        
          result = capsuleCalc(50,70,dscr,noi,amortization,nalog_rate,indexvalue,rate);
         
        } else {
          const dscr = 1.3;

          result = capsuleCalc(30,50,dscr,noi,amortization,nalog_rate,indexvalue,rate);
          
        }
        break;
      }
    case "Гостиничный":
      {
        if (first_class) {
          const dscr = 1.2;
         
          result = capsuleCalc(50,70,dscr,noi,amortization,nalog_rate,indexvalue,rate);
          
        } else {
          const dscr = 1.4;
         
          result = capsuleCalc(0,50,dscr,noi,amortization,nalog_rate,indexvalue,rate);
       
        }
        break;
      }
    default:
      {
        const dscr = 1.4;
       
        result = capsuleCalc(50,70,dscr,noi,amortization,nalog_rate,indexvalue,rate);

      }

  }
  function capsuleCalc(baloon_firsr,baloon_second,dscr,noi,amortization,nalog_rate,indexvalue,rate){
    const ten = calcCredit(baloon_firsr,noi,amortization,nalog_rate,indexvalue,dscr,rate);
    const ten_second = calcCredit( baloon_second, noi, amortization, nalog_rate, indexvalue, dscr-0.1, rate );
    const compl_rate = complementRate(ten,ten_second);
   const ten_compl = calcCredit( baloon_second, noi, amortization, nalog_rate, indexvalue, dscr-0.1, compl_rate )
  return [ten,ten_compl]
  
  }
  
  function complementRate(x,z){
    x = x.total;
     z = z.total;
        const y = z-x;
        return (((x*rate)+y*(rate+bonus_rate))/z)
         }
        
  return result;


}



     
  
  
