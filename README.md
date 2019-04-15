
## MVP Калькулятор

Небольшой калькулятор, позволяющий рассчитать сумму кредита, а также Balloon , исходя из алгоритма, который находится локально(Excel).




## Общая структура

Это SAP(Single Page Application) - разделенный на Model и View. 
Все рассчеты производятся в независимых функциях в папке  `calcFunctions`  и возвращают необходимые для View данные.


### Логика проектирования

На самом деле ее тут и нет. Часто меняются мнения на счет приложения, дописываю на ходу , приложение разростается и становится перегруженным. Это уже вторая версия. Использую React. Redux решил не использовать, поскольку поначалу стэйт казался очень маленьким, а компоненты не были так связаны. Пока все еще не решился использовать Redux, но он уже более необходим, чем на начальном этапе. 


### Использовал 

Использовал библиотеку от Material UI, Bootstrap.
Приложение оптимизировано под все устройства(возможно что то упустил). 

### Режим Администратора

В этом режиме у нас появляется возможность регулирования ставки , войти можно со специальным ключом (12345)
