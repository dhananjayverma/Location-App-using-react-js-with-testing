import React, { useContext } from "react";
import { Context } from ".././ContextApi/ContextProvider";
import "./Map.css";

const Map: React.FC = () => {
  const context: any = useContext(Context);
  const removeAll = () => {
    context.setLocationData([]);
    context.setCurrLocation([]);
    context.setTime([]);
    context.setDate([]);
  };

  const removeLocation = (id: number) => {
    context.setCurrLocation();
    context.setLocationData(
      context.locationData?.filter((data: any, index: number) => {
        return index !== id;
      })
    );
    context.setTime(
      context.time?.filter((data: any, index: number) => {
        return index !== id;
      })
    );
    context.setDate(
      context.date?.filter((data: any, index: number) => {
        return index !== id;
      })
    );
  };

  return (
    <div id="container" data-testid="Map View">
      <div>
        <p id="current">Location History</p>
      </div>
      <div id="location_list">
        {context.locationDetails.map((item: any, index: number) => {
          return (
            <div id="location_data" key={index}>
              <div id="location_line">
                <p id="location_name" numberOfLines={1}>
                  {item.formatted}
                </p>
                <p id="time">
                  {context.date[index]}, {context.time[index]}
                </p>
              </div>
              <div>
                <button
                  data-testid={`list-previous-remove-${index}`}
                  id="remove_btn"
                  onClick={() => {
                    removeLocation(index);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div id="removeAll_btn">
        <button
          data-testid="list-clear-all-button"
          onClick={() => {
            removeAll();
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Map;
