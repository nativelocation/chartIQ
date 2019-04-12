/**
 * StudyUI for adding studies to the chart
 * @module components/UI/StudyUI
 */

import React from 'react'
import OverlayMenu from './OverlayMenu';
import StudyModal from '../Modals/StudyModal/StudyModal';
import MenuSelect from '../shared/MenuSelect'

/**
 * StudyUI for adding studies to the chart
 *
 * @class StudyUI
 * @extends {React.Component}
 */
class StudyUI extends React.Component{
	// constructor(props){
	// 	super(props);
	// }

	componentDidMount(){
		this.props.syncStudies(this.props)
	}

	checkStudyLibrary (studyName) {
		return window.CIQ.Studies.studyLibrary[studyName].name || studyName;
	}

	render(){
		let props = this.props
		let alphabetized = Object.keys(props.studyLibrary)

		alphabetized.sort((a, b) => {
			return a.toLowerCase().localeCompare(b.toLowerCase());
		});

		props.ciq.callbacks.studyOverlayEdit = props.toggleOverlay;
		props.ciq.callbacks.studyPanelEdit = props.openStudyModal;

		return (
			<React.Fragment>
				<OverlayMenu {...props} />
				<StudyModal {...props} />

				<MenuSelect hasButtons={false}
							options={alphabetized}
							keyName='study'
							handleOptionSelect={props.addStudy}
							needsCiq={true}
							ciq={props.ciq}
							menuId='studySelect'
							title='Studies'
							hasLegend={Object.keys(props.studies).length !== 0 ? true : false}
							labelNeedsTransform={true}
							labelTransform={this.checkStudyLibrary}
							legendItems={props.studies}
							legendButtonAction={props.removeAllStudies}
							removeLegendItem={props.removeStudy}
							editLegendItem={props.openStudyModal} />
			</React.Fragment>
		);
	}
};

export default StudyUI;
