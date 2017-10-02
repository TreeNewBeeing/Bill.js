# UberBill.js

Calculate the bill of uber since uber cannot provide the total cost of a period or specific pages

Version Beta 0.1
----------------
  Development goes on safari 10.1.1, but may work on most popular browsers.<br>
  Go to https://riders.uber.com and sign in your account.<br>
  Open the console of browser and copy-paste code into console. <br>
  Then, type in the function you want to use with correct parameters.<br>
  Functions can be used in the bill.js: <br>
     <pre>
        totalByPage(start, end, interval)
            <pre>example: totalByPage(3,15,800);</pre>
        totalByPageAjax(start, end)
            <pre>example: totalByPageAjax(1,27);</pre>
        totalByDateAjax(start,end) 
            <pre>example: totalByDateAjax("17,10,22","16,08,12");</pre>
    </pre>
  Result will be printed in log.
