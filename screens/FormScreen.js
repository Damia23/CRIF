import { View, StyleSheet, Text, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import * as Location from "expo-location";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { useValidation } from "react-simple-form-validator";
import { app } from "../services/firebase";
import { getDatabase, ref, onValue, set, child, get } from "firebase/database";
import * as Crypto from "expo-crypto";

// CIRF = Construction Incident Report Form
const CIRFScreen = ({ navigation }) => {
  var d = new Date();
  const [dateOfReport, setDateOfReport] = useState(d);
  const [dateOfIncident, setDateOfIncident] = useState(d);
  const [time, setTime] = useState(d);
  const [fullName, setFullName] = useState("");
  const [region, setRegion] = useState({
    region: {},
  });
  const [regstr, setRegstr] = useState("");
  const [address, setAddress] = useState("");
  const [identification, setIdentification] = useState("");
  const [toidentification, setTOIdentification] = useState("");
  const [isDLChecked, setCheckedDL] = useState(false);
  const [isPassportChecked, setCheckedPassport] = useState(false);
  const [isOtherIdentificationChecked, setCheckedOtherIdentification] =
    useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // const [location, setLocation] = useState("");
  const [describeIncident, setDescribeIncident] = useState("");
  const [isInjuriesChecked, setCheckedInjuries] = useState(false);
  const [noOneWasInjuredChecked, setCheckedNoOneWasInjured] = useState(false);
  const [describeInjuries, setDescribeInjuries] = useState("");
  const [isWitnessesChecked, setCheckedWitnesses] = useState(false);
  const [noWitnessesChecked, setCheckedNoWitnesses] = useState(false);
  const [witnesses, setWitnesses] = useState("");
  const [dorerrors, setDoRErrors] = useState([]);
  const [doierrors, setDoIErrors] = useState([]);
  const [terrors, setTErrors] = useState([]);
  const [fnerrors, setFNErrors] = useState([]);
  const [aerrors, setAErrors] = useState([]);
  const [perrors, setPErrors] = useState([]);
  const [eerrors, setEErrors] = useState([]);
  const [dincerrors, setDescIncErrors] = useState([]);
  const [dinjerrors, setDescInjErrors] = useState([]);
  const [werrors, setWErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    manageLocationPermission().catch((err) => console.log(err));
  }, []);

  const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
    fieldsRules: {
      dateOfReport: { required: true },
      dateOfIncident: { required: true },
      time: { required: true },
      fullName: { required: true, minlength: 10 },
      address: { required: true, minlength: 20 },
      phone: { required: true, minlength: 10, numbers: true },
      email: { email: true, required: true },
      describeIncident: { required: true },
      // describeInjuries: {},
      // witnesses: {}
    },
    state: {
      dateOfReport,
      dateOfIncident,
      time,
      fullName,
      address,
      phone,
      email,
      describeIncident,
      // describeInjuries,
      // witnesses
    },
  });

  const save_form = () => {
    const db = getDatabase(app);
    const cirfId = Crypto.randomUUID();
    const reference = ref(db, "cirfs/" + cirfId);
    set(reference, {
      dateOfReport: dateOfReport.toDateString(),
      dateOfIncident: dateOfIncident.toDateString(),
      time: time.toTimeString(),
      region: region,
      regstr: regstr,
      fullName: fullName,
      address: address,
      isDLChecked: isDLChecked,
      isPassportChecked: isPassportChecked,
      isOtherIdentificationChecked: isOtherIdentificationChecked,
      toidentification: toidentification,
      identification: identification,
      phone: phone,
      email: email,
      describeIncident: describeIncident,
      isInjuriesChecked: isInjuriesChecked,
      noOneWasInjuredChecked: noOneWasInjuredChecked,
      describeInjuries: describeInjuries,
      isWitnessesChecked: isWitnessesChecked,
      noWitnessesChecked: noWitnessesChecked,
      witnesses: witnesses,
    });
  };

  const submit_form = () => {
    if (isFormValid) {
      save_form();
      navigation.push("SubmitForm");
    } else {
      const errors_arr = [];
      setDoRErrors(getErrorsInField("dateOfReport"));
      setDoIErrors(getErrorsInField("dateOfIncident"));
      setTErrors(getErrorsInField("time"));
      setFNErrors(getErrorsInField("fullName"));
      setAErrors(getErrorsInField("address"));
      setPErrors(getErrorsInField("phone"));
      setEErrors(getErrorsInField("email"));
      setDescIncErrors(getErrorsInField("describeIncident"));
      setDescInjErrors(getErrorsInField("describeInjuries"));
      setWErrors(getErrorsInField("witnesses"));
      setErrors(errors_arr);
    }
  };

  const manageLocationPermission = async () => {
    let status = await Location.requestForegroundPermissionsAsync()
      .then((data) => {
        if (data.granted) {
          Location.installWebGeolocationPolyfill();
          getInitialRegion();
        } else {
          setRegstr("Permission for location is not granted.");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const onDateOfReportChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateOfReport(currentDate);
  };

  const onDateOfIncidentChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateOfIncident(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime;
    setTime(currentTime);
  };

  const _getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setRegstr("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    setRegstr(
      "Latitude: " +
        position.coords.latitude +
        ", Longitude: " +
        position.coords.longitude
    );
    setRegion({
      region: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
    });
  };

  const getInitialRegion = () => {
    _getLocation();
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        style={styles.scrollview}
        bounces
        automaticallyAdjustKeyboardInsets
        automaticallyAdjustsScrollIndicatorInsets
      >
        <View style={styles.innerview}>
          <Text style={styles.title}>Construction Incident Report Form</Text>
          <Text style={styles.subtitle}>
            Use this form to report accidents, injuries, medical situations
            criminal activities or traffic incidents. If possible, a report should be completed within 24 hours
            of the event.
          </Text>

          <View style={styles.subsection}>
            <Text style={styles.field}>Date of Report:</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOfReport}
              mode={"date"}
              is24Hour={true}
              onChange={onDateOfReportChange}
            />
          </View>
          {dorerrors ? <Text style={styles.errors}>{dorerrors}</Text> : <></>}
          <View style={styles.section}>
            <Text style={styles.section_header}>PERSON INVOLVED</Text>
            <Text style={styles.field}>Full name:</Text>
            <TextInput
              value={fullName}
              onChangeText={(fullName) => setFullName(fullName)}
              style={styles.input}
            />
            {fnerrors ? <Text style={styles.errors}>{fnerrors}</Text> : <></>}
            <Text style={styles.field}>Address:</Text>
            <TextInput
              value={address}
              onChangeText={(address) => setAddress(address)}
              style={styles.input}
            />
            {aerrors ? <Text style={styles.errors}>{aerrors}</Text> : <></>}
            <Text style={styles.field}>Type of Identification:</Text>
            <Text>* (Please only enter one type of identification only)</Text>
            <View style={styles.subsection}>
              <Checkbox
                style={styles.checkbox}
                value={isDLChecked}
                onValueChange={setCheckedDL}
              />
              <Text style={styles.field}>Driver's License No.</Text>
            </View>
            {isDLChecked ? (
              <>
                <Text style={styles.field}>Driver's License No.: </Text>
                <TextInput
                  value={identification}
                  onChangeText={(id) => setIdentification(id)}
                  style={styles.input}
                />
              </>
            ) : (
              <></>
            )}
            <View style={styles.subsection}>
              <Checkbox
                style={styles.checkbox}
                value={isPassportChecked}
                onValueChange={setCheckedPassport}
              />
              <Text style={styles.field}>Passport No.</Text>
            </View>
            {isPassportChecked ? (
              <>
                <Text style={styles.field}>Passport No.: </Text>
                <TextInput
                  value={identification}
                  onChangeText={(id) => setIdentification(id)}
                  style={styles.input}
                />
              </>
            ) : (
              <></>
            )}
            <View style={styles.subsection}>
              <Checkbox
                style={styles.checkbox}
                value={isOtherIdentificationChecked}
                onValueChange={setCheckedOtherIdentification}
              />
              <Text style={styles.field}>Other</Text>
            </View>
            {isOtherIdentificationChecked ? (
              <>
                <View style={styles.subsection}>
                  <Text style={styles.field}>What type of ID? </Text>
                  <TextInput
                    value={toidentification}
                    onChangeText={(id) => setTOIdentification(id)}
                    style={styles.input}
                  />
                </View>
                <Text style={styles.field}>Identification detail:</Text>
                <TextInput
                  value={identification}
                  onChangeText={(id) => setIdentification(id)}
                  style={styles.input}
                />
              </>
            ) : (
              <></>
            )}
            <Text style={styles.field}>Phone:</Text>
            <TextInput
              value={phone}
              onChangeText={(phone) => setPhone(phone)}
              style={styles.input}
            />
            {perrors ? <Text style={styles.errors}>{perrors}</Text> : <></>}
            <Text style={styles.field}>Email:</Text>
            <TextInput
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.input}
            />
            {eerrors ? <Text style={styles.errors}>{eerrors}</Text> : <></>}
          </View>
          <Text style={styles.section_header}>THE INCIDENT</Text>
          <View style={styles.subsection}>
            <Text style={styles.field}>Date of Incident:</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOfIncident}
              mode={"date"}
              is24Hour={true}
              onChange={onDateOfIncidentChange}
            />
          </View>
          {doierrors ? <Text style={styles.errors}>{doierrors}</Text> : <></>}
          <View style={styles.subsection}>
            <Text style={styles.field}>Time:</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode={"time"}
              is24Hour={true}
              onChange={onTimeChange}
            />
          </View>
          {terrors ? <Text style={styles.errors}>{terrors}</Text> : <></>}
          <Text style={styles.field}>Location:</Text>
          <TouchableOpacity onPress={_getLocation} style={styles.button}>
            <Text style={styles.buttonText}>Get Current Location</Text>
          </TouchableOpacity>
          <TextInput
            value={regstr}
            editable={false}
            style={styles.input}
            placeholder="Location will be displayed here"
          />
          {/* <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
          /> */}
          {/* <TextInput
            value={location}
            onChangeText={(location) => setLocation(location)}
            style={styles.input}
          /> */}
          <Text style={styles.field}>Describe the incident:</Text>
          <TextInput
            multiline={true}
            value={describeIncident}
            onChangeText={(describeIncident) =>
              setDescribeIncident(describeIncident)
            }
            style={styles.textarea}
          />
          {dincerrors ? <Text style={styles.errors}>{dincerrors}</Text> : <></>}
          <Text style={styles.section_header}>INJURIES</Text>
          <Text style={styles.field}>Was anyone injured?</Text>
          <View style={styles.subsection}>
            <Checkbox
              style={styles.checkbox}
              value={isInjuriesChecked}
              onValueChange={setCheckedInjuries}
            />
            <Text style={styles.field}>Yes</Text>
            <Checkbox
              style={styles.checkbox}
              value={noOneWasInjuredChecked}
              onValueChange={setCheckedNoOneWasInjured}
            />
            <Text style={styles.field}>No</Text>
          </View>
          {isInjuriesChecked ? (
            <>
              <Text style={styles.field}>If yes, describe the injuries:</Text>
              <TextInput
                multiline={true}
                value={describeInjuries}
                onChangeText={(describeInjuries) =>
                  setDescribeInjuries(describeInjuries)
                }
                style={styles.textarea}
              />
            </>
          ) : (
            <></>
          )}
          {dinjerrors ? <Text style={styles.errors}>{dinjerrors}</Text> : <></>}
          <Text style={styles.section_header}>WITNESSES</Text>
          <Text style={styles.field}>
            Were there witnesses to the incident?
          </Text>
          <View style={styles.subsection}>
            <Checkbox
              style={styles.checkbox}
              value={isWitnessesChecked}
              onValueChange={setCheckedWitnesses}
            />
            <Text style={styles.field}>Yes</Text>
            <Checkbox
              style={styles.checkbox}
              value={noWitnessesChecked}
              onValueChange={setCheckedNoWitnesses}
            />
            <Text style={styles.field}>No</Text>
          </View>
          {isWitnessesChecked ? (
            <>
              <Text style={styles.field}>
                If yes, enter the witnesses' names and contact info:
              </Text>
              <TextInput
                multiline={true}
                value={witnesses}
                onChangeText={(witnesses) => setWitnesses(witnesses)}
                style={styles.textarea}
              />
            </>
          ) : (
            <></>
          )}
          {werrors ? <Text style={styles.errors}>{werrors}</Text> : <></>}
          {/* <Text>Witness #1 Name</Text>
        <TextInput
          value={userName}
          onChangeText={(userName) => setUserName(userName)}
          style={styles.input}
        />
        <Text>Wtiness #1 Contact Info</Text>
        <TextInput
          value={userName}
          onChangeText={(userName) => setUserName(userName)}
          style={styles.input}
        /> */}

          <Text>{errors}</Text>
          <TouchableOpacity
            onPress={() => submit_form()}
            style={styles.submit_btn}
          >
            <Text style={styles.submit_btn_text}>Submit Form</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

var { Platform } = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 20,
  },
  scrollview: {
    width: Dimensions.get("window").width - 10,
    padding: 10,
  },
  innerview: {
    height: 3000,
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    // width: Dimensions.get("window").width - 10,
    width: "100%",
    height: 44,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
  textarea: {
    // width: Dimensions.get("window").width - 10,
    width: "100%",
    minHeight: 128,
    padding: 10,
    // margin: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
  section: {
    padding: 5,
  },
  section_header: {
    textAlign: "center",
    backgroundColor: "orange",
    color: "white",
    fontWeight: 700,
    padding: 10,
    marginBottom: 10,
  },
  subsection: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 5,
  },
  map: {
    width: "100%",
    height: "10%",
  },
  nav_link: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  submit_btn: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  submit_btn_text: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  field: {
    fontSize: 18,
    marginVertical: 10,
  },
  errors: {
    color: "red",
    marginVertical: 5,
  },
});

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=restaurant&name=harbour&key=AIzaSyCK8XiPvTytCUBcc1q6DYTkbgt8q50i_F0

export default CIRFScreen;
