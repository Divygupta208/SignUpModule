import React from "react";

const Card = (props) => {
  return (
    <div className=" w-96 mt-[200px] ml-[500px] rounded-lg border-2  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  flex flex-wrap">
      {props.children}
    </div>
  );
};

export default Card;
