import React, { useContext, useEffect, useState } from "react";
import { Context } from "../ContextApi/ContextProvider";
import moment from "moment";
import { getLocationData} from "../ApiADD/Location";
import { post_Location } from "../ApiADD/MyLocation";
const Home=()=>{
  const context: any = useContext(Context);
  const [errorMsg, setErrorMsg] = useState("");
  const fetch_location = async () => {
    let longitude;
    let latitude;
    context.setTime((prevValue: any) => {
      return [...prevValue, moment().format("HH:mm:ss")];
    });
    context.setDate((prevValue: any) => {
      return [...prevValue, moment().format("MM/DD/YYYY")];
    });
    if (context.location?.length > 0) {
      let response = await getLocationData(
        context.location.latitude,
        context.location.longitude
      );
      await context.setLocationData(response.data.results);
      await context.setCurrLocation(response.data.results);
      post_Location(response.data.results, moment().format("HH:mm:ss"));
    } else {
      const getLocation = require("expo-location");

      let { status } = await getLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location: any = await getLocation.getCurrentPositionAsync({});
      longitude = await location.coords.longitude;
      latitude = await location.coords.latitude;
    }
    context.setCurrLocation([]);
    getLocationData(longitude, latitude).then((response: any) => {
      context.setLocationData((prevRes: any) => {
        return [...prevRes, ...response.data.results];
      });
      context.setCurrLocation(response.data.results);
      post_Location(
        response.data.results[0].formatted,
        moment().format("HH:mm:ss")
      );
    });
  };

  const updater = async () => {
    if (context.locationDetails?.length > 29) {
      await context.locationDetails?.shift();
      await context.time.shift();
      fetch_location();
    } else {
      fetch_location();
    }
  };

  const remove_All = () => {
    context.setLocationData([]);
    context.setCurrLocation([]);
    context.setTime([]);
    context.setDate([]);
  };

  const remove_Location = (id: number) => {
    context.setCurrLocation();
    context.setLocationData(
      context.locationDetails?.filter((data: any, index: number) => {
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

  useEffect(() => {
    if (context.locationData?.length === 0) {
      updater();
    } else {
      const timer = setInterval(() => {
      updater();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [context.locationData]);

  return (
    <div id="container">
      <div id="header">
        <div>
          <p id="heading">Location Manager</p>
        </div>
        <div>
          <p testID="list-current-label" id="current">
            Current Location
          </p>
        </div>
        <div id="box_alignment" testID="list-current-item">
          <div id="styles.box" testID="list-current-icon">
            <p id="box_text">NA</p>
          </div>
          <div style={styles.location}>
            <div>
              <p
                testID="list-current-name"
                id="location_text"
                numberOfLines={1}
              >
                {context.currLocation?.length > 0
                  ? context.currLocation[0]?.formatted
                  : "Wait location is loading.."}
              </p>
            </div>
            <div>
              <p id="time" testID="list-current-time">
                {moment().format("MM/DD/YYYY")}, {moment().format("HH:mm:ss")}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p style={styles.current}>Previous Location</p>
        </div>
        <div id="location_list">
          <ul
            data={context.locationData}
            renderItem={(item) => {
              return (
                <div id="location_data">
                  <div id="location_line">
                    <p
                      testID={`List-previous-name-${item.index}`}
                     id="location_name"
                      numberOfLines={1}
                    >
                      {item.item.formatted}
                    </p>
                    <p
                      testID={`List-previous-time-${item.index}`}
                     id="time"
                    >
                      {context.date[item.index]},
                      {context.time[item.index]}
                    </p>
                  </div>
                  <div>
                    <Button
                      testID={`list-previous-remove-${item.index}`}
                      labelStyle={{ fontSize: 12 }}
                      id="remove_btn"
                      uppercase={false}
                      mode="outlined"
                      onClick={() => {
                        remove_Location(item.index);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            }}
            keyExtractor={() => Math.random().toString(36).slice(2, 7)}
          />
        </div>
      </div>
      <div id="removeAll_btn">
        <Button
          testID="list-clear-all-button"
          uppercase={false}
          mode="contained"
          onClick={() => {
            remove_All();
          }}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
