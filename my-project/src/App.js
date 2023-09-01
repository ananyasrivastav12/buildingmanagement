import React, { useState } from "react";
import { generateDate , months} from "./util/calendar";
import cn from "./util/cn";
import dayjs from "dayjs";
import {GrFormNext , GrFormPrevious} from "react-icons/gr";

export default function App(){
  // console.log(generateDate());

  const days = ["S" , "M" , "T" , "W" , "T" , "F" , "S"];

  const currentDate = dayjs();

  const [today , setToday] = useState(currentDate);

  const [selectDate , setSelectDate] = useState(currentDate);

  return (

    <div className="flex w-1/2 mx-auto divide-x-2 gap-10 h-screen items-center">

      <div className="w-96 h-96">

        <div className="flex justify-between">
          <h1 className="font-semibold">
            {months[today.month()]} , {today.year()}
          </h1>

          <div className="flex items-center gap-5">
            <GrFormPrevious className="w-5 h-5 cursor-pointer" onClick={() => {
              setToday(today.month(today.month()-1));
            }}/>

            <h1 className="cursor-pointer" 
            onClick={() => {
              setToday(currentDate);
              }}>Today</h1>

            <GrFormNext className="w-5 h-5 cursor-pointer" onClick={() => {
              setToday(today.month(today.month()+1));
            }}/>
          </div>
        </div>

        <div className="w-full grid grid-cols-7 text-gray-500">
          {
            days.map((day , index) => {
              return <h1 key={index} className="h-14 grid place-content-center text-sm">
                {day}
              </h1>
            })
          }
        </div>

        <div className="w-full grid grid-cols-7">

          {generateDate(today.month() , today.year()).map(({date , currentMonth , today} , index) => {

            return (
              <div key={index} className="h-14 border-t grid place-content-center text-sm">
                <h1 className={cn(currentMonth? "": "text-gray-400" , 
                today? "bg-purple-600 text-white" : "" ,
                selectDate.toDate().toDateString() === date.toDate().toDateString()? "bg-black text-white": "" ,
                "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all cursor-pointer")}

                onClick={() => {
                  setSelectDate(date);
                }}
                >
                  {date.date()}
                </h1>
              </div>

            );

          })}

        </div>

      </div>

      <div className="h-96 w-96">
        <h1 className="font-semibold">Book Meeting Room for {selectDate.toDate().toDateString()} </h1>
        <p>Check Availability</p>
      </div>

    </div>

  );

}
