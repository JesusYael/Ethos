import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function App() {
  const availableTimes = [
    '9:00 am - 10:00 am',
    '10:00 am - 11:00 am',
    '11:00 am - 12:00 pm',
    '12:00 pm - 1:00 pm',
    '1:00 pm - 2:00 pm',
    '2:00 pm - 3:00 pm',
    '3:00 pm - 4:00 pm',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.appointmentContainer}>
        <Text style={styles.headerText}>La siguiente cita agendada es</Text>
        <Text style={styles.dateText}>15/06/2023 4:30 pm</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Reagendar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subHeaderText}>Horarios y fechas disponibles para reagendar</Text>
        <Calendar
          style={styles.calendar}
          current={'2024-06-15'}
          minDate={'2024-06-01'}
          maxDate={'2024-06-30'}
          onDayPress={(day) => {
            console.log('selected day', day);
          }}
          monthFormat={'yyyy MM'}
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          hideArrows={false}
          hideExtraDays={true}
          disableMonthChange={false}
          firstDay={1}
          showWeekNumbers={true}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          disableAllTouchEventsForDisabledDays={true}
          renderHeader={(date) => {/*Return JSX*/}}
          enableSwipeMonths={true}
        />
        <Text style={styles.subHeaderText}>Horarios disponibles</Text>
        <FlatList
          data={availableTimes}
          renderItem={({ item }) => <Text style={styles.timeText}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  appointmentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  calendar: {
    width: '100%',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
