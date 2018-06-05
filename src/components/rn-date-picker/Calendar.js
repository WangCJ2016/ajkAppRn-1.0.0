'use strict';

import React from 'react';
import {
	ListView,
	StyleSheet,
	Dimensions
} from 'react-native';
import PropTypes from 'prop-types'
const { width } = Dimensions.get('window');

import Month from './Month';


export default class Calendar extends React.Component {
	static defaultProps = {
		startDate: new Date(),
		monthsCount: 6,

		monthsLocale: ['一月', '二月', '三月', '四月', '五月', '六月',
			'七月', '八月', '九月', '十月', '十一月', '十二月'],
		weekDaysLocale: ['日','一', '二', '三', '四', '五', '六',],

		width: width,

		bodyBackColor: 'white',
		bodyTextColor: 'rgba(52,72,94,0.54)',
		headerSepColor: 'grey',

		monthTextColor: '#363636',

		dayCommonBackColor: 'white',
		dayCommonTextColor: '#ffb354',

		dayDisabledBackColor: 'white',
		dayDisabledTextColor: '#E1E4E7',

		daySelectedBackColor: '#ffb354',
		daySelectedTextColor: 'white',

		dayInRangeBackColor: '#ffb354',
		dayInRangeTextColor: '#FFFFFF',

		isFutureDate: true,
		rangeSelect: true,
		startFromMonday: true,
		selectAllDate: false,
		clear:false
	};

	static propTypes = {
		selectFrom: PropTypes.instanceOf(Date),
		selectTo: PropTypes.instanceOf(Date),

		monthsCount: PropTypes.number,
		startDate: PropTypes.instanceOf(Date),

		monthsLocale: PropTypes.arrayOf(PropTypes.string),
		weekDaysLocale: PropTypes.arrayOf(PropTypes.string),
		startFromMonday: PropTypes.bool,

		onSelectionChange: PropTypes.func,

		width: PropTypes.number,

		bodyBackColor: PropTypes.string,
		bodyTextColor: PropTypes.string,
		headerSepColor: PropTypes.string,

		monthTextColor: PropTypes.string,

		dayCommonBackColor: PropTypes.string,
		dayCommonTextColor: PropTypes.string,

		dayDisabledBackColor: PropTypes.string,
		dayDisabledTextColor: PropTypes.string,

		daySelectedBackColor: PropTypes.string,
		daySelectedTextColor: PropTypes.string,

		dayInRangeBackColor: PropTypes.string,
		dayInRangeTextColor: PropTypes.string,

		isFutureDate: PropTypes.bool,
		rangeSelect: PropTypes.bool,

		beSaleArr:PropTypes.array,
		selectAllDate: PropTypes.bool,
		monthIncomeTitle: PropTypes.string,
		defaultPrice:PropTypes.number,
		houseCalendar:PropTypes.array,
		clear:PropTypes.bool
	};
  
	constructor(props) {
		super(props)
		this.changeSelection = this.changeSelection.bind(this);
		this.generateMonths = this.generateMonths.bind(this);

		let {selectFrom, selectTo, monthsCount, startDate} = this.props;
		this.selectFrom = selectFrom;
		this.selectTo = selectTo;
		this.multipleSelectArr = [] // multiple
		this.months = this.generateMonths(monthsCount, startDate);
   
		var dataSource = new ListView.DataSource({rowHasChanged: this.rowHasChanged});
		this.state = {
			dataSource: dataSource.cloneWithRows(this.months)
		}
	}

	rowHasChanged(r1, r2) {
		for (var i = 0; i < r1.length; i++) {
			if (r1[i].status !== r2[i].status && !r1[i].disabled) {
				return true;
			}
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.clear&&!this.props.clear) {
			this.changeSelection(true);
		}
		if(nextProps.selectFrom && nextProps.selectTo){
			this.selectFrom = nextProps.selectedFrom;
			this.selectTo = nextProps.selectTo;
			this.changeSelection(nextProps.selectFrom);
		}
	}
 
	generateMonths(count, startDate) {
		var months = [];
		var dateUTC;
		var monthIterator = startDate;
		var {isFutureDate, startFromMonday} = this.props;
		var startUTC = Date.UTC(startDate.getYear(), startDate.getMonth(), startDate.getDate());
		for (var i = 0; i < count; i++) {
			var month = this.getDates(monthIterator, startFromMonday);

			months.push(month.map((day) => {
				dateUTC = Date.UTC(day.getYear(), day.getMonth(), day.getDate());
				const a = new Date(day)
				const formateDay =  a.getFullYear()+'-'+(a.getMonth()>9?a.getMonth()+1:'0'+(a.getMonth()+1))+'-'+(a.getDate()>9?a.getDate():'0'+a.getDate())

				if(this.props.selectAllDate) {
					return {
						date: day,
						status: this.getStatus(day, this.selectFrom, this.selectTo),
						disabled: (day.getMonth() !== monthIterator.getMonth())
					}
				}
				if(this.props.beSaleArr) {
					return {
						date: day,
						status: this.getStatus(day, this.selectFrom, this.selectTo),
						disabled: day.getMonth() !== monthIterator.getMonth()
					  ||((isFutureDate) ? startUTC > dateUTC : startUTC < dateUTC) || this.props.beSaleArr.indexOf(formateDay) > -1?true:false,
						beSale: this.props.beSaleArr.indexOf(formateDay) > -1?true:false
					}
				}else{
					return {
						date: day,
						status: this.getStatus(day, this.selectFrom, this.selectTo),
						disabled: (day.getMonth() !== monthIterator.getMonth())
						|| ((isFutureDate) ? startUTC > dateUTC : startUTC < dateUTC),
					}
				}
				
			}));

			if (isFutureDate) {
				monthIterator.setMonth(monthIterator.getMonth() + 1);
			} else {
				monthIterator.setMonth(monthIterator.getMonth() - 1);
			}
		}
    
		return months;
	}
  // 计算每月的日期
	getDates(month, startFromMonday) {
		month = new Date(month);
		month.setDate(1);

		var delta = month.getDay(); // 1号是周几
		if (startFromMonday) {
			delta--;
			if (delta === -1) delta = 6;
		}

		var startDate = new Date(month); 
		startDate.setDate(startDate.getDate() - delta); // 日历第一个日期是几号
		month.setMonth(month.getMonth() + 1);
		month.setDate(0);   // 当月最后一天的是几号
    
		delta = 6 - month.getDay();
		if (startFromMonday) {
			delta++;
			if (delta === 7) delta = 0;
		}

		var lastDate = new Date(month);
		lastDate.setDate(lastDate.getDate() + delta);

		var allDates = [];
		while (startDate <= lastDate) {
			allDates.push(new Date(startDate));
			startDate.setDate(startDate.getDate() + 1);
		}
		return allDates;
	}

	changeSelection(value) {
		
		var {selectFrom, selectTo, months} = this;
    if(this.props.multiple) {
			 if(value===true){
				this.multipleSelectArr=[]
			 }else{
				const index = this.multipleSelectArr.indexOf(new Date(value).toDateString())
				if(index>-1) {
					this.multipleSelectArr.splice(index,1)
				}else{
					this.multipleSelectArr.push(new Date(value).toDateString())
				}	
			 }
			months = months.map((month) => {
				return month.map((day) => {
					return {
						date: day.date,
						status: this.getStatus(day.date),
						disabled: day.disabled,
						beSale: day.beSale
					}
				})
			});
			this.props.onSelectionChange(this.multipleSelectArr);
		}else{
			if (!selectFrom) {
				selectFrom = value;
			} else if (!selectTo) {
				if (value > selectFrom) {
					selectTo = value;
				} else {
					selectFrom = value;
				}
			} else if (selectFrom && selectTo) {
				selectFrom = value;
				selectTo = null;
			}
	    
			months = months.map((month) => {
				return month.map((day) => {
					return {
						date: day.date,
						status: this.getStatus(day.date, selectFrom, selectTo),
						disabled: day.disabled,
						beSale: day.beSale
					}
				})
			});
		
			if (this.props.rangeSelect) {
				this.selectFrom = selectFrom;
				this.selectTo = selectTo;
			} else {
				this.selectFrom = this.selectTo = selectFrom;
			}
			const selectedRange = this.props.rangeSelect ? {selectFrom, selectTo} : null
		
			this.prevValue = value;
			this.props.onSelectionChange(value, this.prevValue, selectedRange);
		}
			this.months = months;
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(months)
			});
		
	}

	getStatus(date, selectFrom, selectTo) {
		if(this.props.multiple) {
		 	if(this.multipleSelectArr.indexOf(date.toDateString())>-1) {
				return 'inRange';
			 }
		}
		if (selectFrom) {
			if (selectFrom.toDateString() === date.toDateString()) {
				return 'selectedFrom';
			}
		}
		if (selectTo) {
			if (selectTo.toDateString() === date.toDateString()) {
				return 'selectedTo';
			}
		}
		if (selectFrom && selectTo) {
			if (selectFrom < date && date < selectTo) {
				return 'inRange';
			}
		}
		return 'common';
	}

	render() {
	
		let {style, isFutureDate} = this.props;
		let directionStyles = {};
		if (!isFutureDate) {
			directionStyles = {
				transform: [{scaleY: -1}]
			}
		}

		return (
			<ListView
				showsVerticalScrollIndicator={false}
				initialListSize={5}
				scrollRenderAheadDistance={1200}
				style={[styles.listViewContainer, directionStyles, style]}
				dataSource={this.state.dataSource}
				renderRow={(month) => {
					return (
						<Month
							{...this.props}
							days={month}
							style={[styles.month, directionStyles]}
							changeSelection={this.changeSelection}
						/>
					);
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	listViewContainer: {
		flex: 1,
		backgroundColor: 'white',
		alignSelf: 'stretch',
	},
	month: {
	}
});