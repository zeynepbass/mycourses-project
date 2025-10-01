import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import Input from './Input';
import { useState } from 'react';
import { getFormattedDate } from '../helper/date';

export default function CourseForm({
  cancelHandler,
  onSubmit,
  buttonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },

    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  function addOrUpdateHandler() {
    const courseData = {
      amount: Number(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    console.log(courseData);

    const amountIsValid = courseData.amount > 0;
    const dateIsValid = courseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = courseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: {
            value: Number(currentInputs.amount.value),
            isValid: amountIsValid,
          },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(courseData);
  }

  console.log(inputs);
  function inputChange(inputIdentifier, entewarningValue) {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: { value: entewarningValue, isValid: true },
      };
    });
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Kurs Bilgileri</Text>
      <View style={styles.priceAndDate}>
        <Input
          style={styles.flexAll}
          label="Tutar"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChange.bind(this, 'amount'),
            value: inputs.amount.value.toString(),
          }}
        />
        <Input
          style={styles.flexAll}
          label="Tarih"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeHolder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChange.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label="Başlık"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChange.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
    
      <View style={styles.buttons}>
        <Pressable onPress={cancelHandler}>
          <View style={styles.cancel}>
            <Text style={styles.cancelText}>İptal Et</Text>
          </View>
        </Pressable>
        <Pressable onPress={addOrUpdateHandler}>
          <View style={styles.addOrDelete}>
            <Text style={styles.addOrDeleteText}>{buttonLabel}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize:20,
    paddingVertical:20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginTop: 20,
  },

  cancel: {
    backgroundColor: '#6B7280', 
    borderRadius: 30,
    minWidth: 120,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginVertical:5
  },
  cancelText: {
    color: '#F9FAFB', 
    fontWeight: '600',
    fontSize: 16,
  },

  addOrDelete: {
    backgroundColor: '#F97316', 
    borderRadius: 30,
    minWidth: 120,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  addOrDeleteText: {
    color: '#F9FAFB', 
    fontWeight: '600',
    fontSize: 16,
  },
});

