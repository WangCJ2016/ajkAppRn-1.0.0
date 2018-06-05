'use strict';

import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native';

export default class Day extends React.Component {
	render() {
		let {date, status, disabled, onDayPress,beSale, width} = this.props;
		let onPress, textColor, backColor,moneyColor, selectedFromStyle, selectedToStyle, borderTopLeftRadius, borderBottomLeftRadius, borderTopRightRadius, borderBottomRightRadius ;

		if (disabled) {
			status = 'disabled';
			onPress = null;
		} else {
			onPress = () => {
				onDayPress(date);
			}
		}

		switch (status) {
			case 'disabled':
				backColor = this.props.dayDisabledBackColor;
				textColor = this.props.dayDisabledTextColor;
				moneyColor = '#ccc'
				break;

			case 'common':
				backColor = this.props.dayCommonBackColor;
				textColor = this.props.dayCommonTextColor;
				moneyColor = '#ccc'
				break;

			case 'selectedFrom':
				backColor = this.props.daySelectedBackColor;
				textColor = this.props.daySelectedTextColor;
				moneyColor = '#fff'
				selectedFromStyle = {borderTopLeftRadius: Math.floor(width/14), borderBottomLeftRadius: Math.floor(width/14)};
				break;

			case 'selectedTo':
				backColor = this.props.daySelectedBackColor;
				textColor = this.props.daySelectedTextColor;
				moneyColor = '#fff'
				selectedToStyle = { borderTopRightRadius: Math.floor(width/14), borderBottomRightRadius: Math.floor(width/14)};
				break;

			case 'inRange':
				backColor = this.props.dayInRangeBackColor;
				textColor = this.props.dayInRangeTextColor;
				moneyColor = '#fff'
				break;
		}



		const dynamicStyle = {backgroundColor: backColor, width: Math.floor(width/7), height: Math.floor(width/10)};
		const isToday = status === 'common' && new Date().toDateString() === date.toDateString() ? {borderWidth: 1, borderRadius: 10, borderColor: '#ffb354'} : {}
		
		let defaultPrice = this.props.defaultPrice
		if(this.props.houseCalendar) {
			this.props.houseCalendar.forEach(item=>{
				const itemArr = item.split(',')
				if(new Date(itemArr[0]).toDateString() === date.toDateString()) {
					defaultPrice = itemArr[1]
				}
			})
		}

		return (
			<TouchableOpacity
			  disabled={!this.props.onSelectionChange}  
				activeOpacity={disabled ? 1 : 0.9}
				style={[styles.common, dynamicStyle, selectedFromStyle, selectedToStyle]}
				onPress={onPress}>
				<Text style={[{color: textColor}, styles.text, isToday]}>{new Date().toDateString() === date.toDateString()?'今':date.getDate()}</Text>
				{this.props.defaultPrice?<Text style={{color:moneyColor,fontSize:12}}>{beSale?'已售':'¥'+defaultPrice}</Text>:null}
				
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	common: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		marginVertical: 3
	},
	text: {
		fontSize: 14,
		width: 20, 
		height:20,
		lineHeight:20,
		fontWeight: '500',
		textAlign: 'center',
		backgroundColor: 'transparent'
	}
});