<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import {
  HStack,
<<<<<<< HEAD
=======
import {
>>>>>>> 7bdc82135 (Feat: create assignmentList component)
=======
>>>>>>> c5bf4fcc4 (Feat: stacked name in list component)
  List,
  ListItem,
  Text
} from '@chakra-ui/react';
<<<<<<< HEAD
=======
=======
import { useEffect } from 'react';
>>>>>>> 160ffbe83 (Feat: create assignment service)
import { Divider, HStack, List, ListItem, Text } from '@chakra-ui/react';
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> fb3d63d20 (Feat: update to logic for practice tests)

const AssignmentList = () => {
=======
import { useTranslation } from 'react-i18next';
import useAssignmentByUserAssociations from '../../services/useAssignmentByUserAssociations';

const AssignmentList = () => {
	const { t: i18n } = useTranslation();
	const { getAssignments } = useAssignmentByUserAssociations();

	const mockData = {
		displayCurriculum: {
			curricKey: '96WJCR6EP-1',
			curricUid: '53e9b430-88f3-4f87-95fd-f77430379151',
			name: 'Math',
			version: 1,
			kind: 'Composite',
			descriptionRc: '<p>Math Curriculum</p>\n',
			locale: 'en',
			estimatedTimeToComplete: 42,
			estimatedTimeToCompleteRequired: 0,
			totalLearningUnits: 28,
			totalCompletedLearningUnits: 7,
			totalRequiredLearningUnits: 0,
			totalCompletedRequiredLearningUnits: 0,
			totalCompletedAssignments: 1,
			totalEstimatedAssignments: 1,
			totalNotEstimatedAssignments: 0,
			totalOtherAssignments: 0,
			showModuleStatus: false,
			defaultAllottedTime: 0,
			isSingleAssignment: false,
			children: [
				{
					curricKey: 'M5QF7KN4X-1',
					curricUid: '6af13155-a5b1-4741-878c-c6e4d664f73b',
					name: 'Addition',
					version: 1,
					kind: 'Module',
					descriptionRc: '<p>Addition Module</p>\n',
					locale: 'en',
					estimatedTimeToComplete: 0,
					estimatedTimeToCompleteRequired: 0,
					learningUnitCount: 7,
					totalLearningUnits: 7,
					totalCompletedLearningUnits: 7,
					totalRequiredLearningUnits: 0,
					totalCompletedRequiredLearningUnits: 0,
					totalCompletedAssignments: 1,
					totalEstimatedAssignments: 0,
					totalNotEstimatedAssignments: 0,
					totalOtherAssignments: 0,
					moduleStatus: 'None',
					defaultAllottedTime: 0,
					isSingleAssignment: false,
					assignments: [
						{
							assignmentKey: 'JLB6MQSLN',
							assignmentUid: '15d7416e-e014-40a3-a323-f28efdd598db',
							status: 'COMPLETED',
							assignmentType: 'Learning',
							completionAlgorithmType: 'Correct1x',
							learningUnitsCorrect2x: 0,
							learningUnitsUnseen: 0,
							learningUnitsMisinformed: 0,
							learningUnitsUninformed: 0,
							learningUnitsNotSure: 0,
							learningUnitsInformed: 0,
							learningUnitsCorrect1x: 7,
							numCompletedLearningUnits: 7,
							estimatedTimeToComplete: 0,
							numLearningUnits: 7,
							startedTimestamp: '2022-11-15 23:09:06 -0700',
							createdTimestamp: '2022-11-15 23:08:59 -0700',
							effectiveTimestamp: null,
							completedTimestamp: '2022-11-15 23:09:55 -0700',
							expiresTimestamp: null,
							canceledTimestamp: null,
							canCreateFocusedRefresher: false,
							estimatedTimeToCompleteForRefresher: 105,
							learningUnitsMastered: 0,
							learningUnitsProficient: 7,
						},
						{
							assignmentKey: 'QE37MPLTT',
							assignmentUid: '70ba64d1-305e-4867-ac79-ab83f8fdf505',
							status: 'IN_PROGRESS',
							assignmentType: 'Refresher',
							completionAlgorithmType: 'Correct1x',
							learningUnitsCorrect2x: 0,
							learningUnitsUnseen: 7,
							learningUnitsMisinformed: 0,
							learningUnitsUninformed: 0,
							learningUnitsNotSure: 0,
							learningUnitsInformed: 0,
							learningUnitsCorrect1x: 0,
							numCompletedLearningUnits: 0,
							estimatedTimeToComplete: 105,
							numLearningUnits: 7,
							startedTimestamp: '2022-11-15 23:09:57 -0700',
							createdTimestamp: '2022-11-15 23:09:57 -0700',
							effectiveTimestamp: null,
							completedTimestamp: null,
							expiresTimestamp: null,
							canceledTimestamp: null,
							learningUnitsMastered: 0,
							learningUnitsProficient: 0,
						},
					],
					learnerProgress: 25,
				},
				{
					curricKey: 'HUEA7PH68-1',
					curricUid: '2fbb55b5-b876-435d-94d7-33ebcfa8428f',
					name: 'Multiplication',
					version: 1,
					kind: 'Module',
					descriptionRc: '<p>Multiplication Module</p>\n',
					locale: 'en',
					estimatedTimeToComplete: 42,
					estimatedTimeToCompleteRequired: 0,
					learningUnitCount: 7,
					totalLearningUnits: 7,
					totalCompletedLearningUnits: 0,
					totalRequiredLearningUnits: 0,
					totalCompletedRequiredLearningUnits: 0,
					totalCompletedAssignments: 0,
					totalEstimatedAssignments: 1,
					totalNotEstimatedAssignments: 0,
					totalOtherAssignments: 0,
					moduleStatus: 'None',
					defaultAllottedTime: 0,
					isSingleAssignment: false,
					assignments: [
						{
							assignmentKey: 'TYY8MFM7J',
							assignmentUid: '1a725e54-ec60-4197-8342-b7f53d092fe4',
							status: 'NOT_STARTED',
							assignmentType: 'Learning',
							completionAlgorithmType: 'Correct1x',
							learningUnitsCorrect2x: 0,
							learningUnitsUnseen: 7,
							learningUnitsMisinformed: 0,
							learningUnitsUninformed: 0,
							learningUnitsNotSure: 0,
							learningUnitsInformed: 0,
							learningUnitsCorrect1x: 0,
							numCompletedLearningUnits: 0,
							estimatedTimeToComplete: 42,
							numLearningUnits: 7,
							startedTimestamp: null,
							createdTimestamp: '2022-11-15 23:08:59 -0700',
							effectiveTimestamp: null,
							completedTimestamp: null,
							expiresTimestamp: null,
							canceledTimestamp: null,
							canCreateFocusedRefresher: false,
							learningUnitsMastered: 0,
							learningUnitsProficient: 0,
						},
					],
					learnerProgress: 25,
				},
				{
					curricKey: 'AMKC7JGAX-1',
					curricUid: '7b85a551-b64f-4b8f-93f4-b552b1b5138b',
					name: 'Addition TA',
					version: 1,
					kind: 'Module',
					descriptionRc: null,
					locale: 'en',
					estimatedTimeToComplete: 0,
					estimatedTimeToCompleteRequired: 0,
					learningUnitCount: 7,
					totalLearningUnits: 7,
					totalCompletedLearningUnits: 0,
					totalRequiredLearningUnits: 0,
					totalCompletedRequiredLearningUnits: 0,
					totalCompletedAssignments: 0,
					totalEstimatedAssignments: 0,
					totalNotEstimatedAssignments: 0,
					totalOtherAssignments: 0,
					moduleStatus: 'None',
					defaultAllottedTime: 3600,
					isSingleAssignment: false,
					assignments: [
						{
							assignmentKey: 'V4CBM956T',
							assignmentUid: '7b3731c0-1c28-45e4-a4e4-3e20808e97b5',
							status: 'NOT_STARTED',
							assignmentType: 'TimedAssessment',
							completionAlgorithmType: 'Assessment',
							learningUnitsCorrect2x: 0,
							learningUnitsUnseen: 7,
							learningUnitsMisinformed: 0,
							learningUnitsUninformed: 0,
							learningUnitsNotSure: 0,
							learningUnitsInformed: 0,
							learningUnitsCorrect1x: 0,
							numCompletedLearningUnits: 0,
							estimatedTimeToComplete: 3600,
							numLearningUnits: 7,
							startedTimestamp: null,
							createdTimestamp: '2022-11-15 23:08:59 -0700',
							effectiveTimestamp: null,
							completedTimestamp: null,
							expiresTimestamp: null,
							canceledTimestamp: null,
							learningUnitsMastered: 0,
							learningUnitsProficient: 0,
						},
					],
					learnerProgress: 25,
				},
				{
					curricKey: 'WKV97URSA-1',
					curricUid: '30ee6759-a6ef-4edb-9029-4a1f5e416dcc',
					name: 'Multiplication TA',
					version: 1,
					kind: 'Module',
					descriptionRc: null,
					locale: 'en',
					estimatedTimeToComplete: 0,
					estimatedTimeToCompleteRequired: 0,
					learningUnitCount: 7,
					totalLearningUnits: 7,
					totalCompletedLearningUnits: 0,
					totalRequiredLearningUnits: 0,
					totalCompletedRequiredLearningUnits: 0,
					totalCompletedAssignments: 0,
					totalEstimatedAssignments: 0,
					totalNotEstimatedAssignments: 0,
					totalOtherAssignments: 0,
					moduleStatus: 'None',
					defaultAllottedTime: 3600,
					isSingleAssignment: false,
					assignments: [
						{
							assignmentKey: 'DBHAMHAGA',
							assignmentUid: '7c08413d-9521-43e3-85e5-a476d957fa08',
							status: 'NOT_STARTED',
							assignmentType: 'TimedAssessment',
							completionAlgorithmType: 'Assessment',
							learningUnitsCorrect2x: 0,
							learningUnitsUnseen: 7,
							learningUnitsMisinformed: 0,
							learningUnitsUninformed: 0,
							learningUnitsNotSure: 0,
							learningUnitsInformed: 0,
							learningUnitsCorrect1x: 0,
							numCompletedLearningUnits: 0,
							estimatedTimeToComplete: 3600,
							numLearningUnits: 7,
							startedTimestamp: null,
							createdTimestamp: '2022-11-15 23:08:59 -0700',
							effectiveTimestamp: null,
							completedTimestamp: null,
							expiresTimestamp: null,
							canceledTimestamp: null,
							learningUnitsMastered: 0,
							learningUnitsProficient: 0,
						},
					],
					learnerProgress: 25,
				},
			],
			learnerProgress: 25,
		},
		assignmentStatistics: null,
		reviewHeaderResource: null,
	};
>>>>>>> d5cdc7d8e (Feat: add i18n texts)

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const mockData = {
    "displayCurriculum": {
      "curricKey": "96WJCR6EP-1",
      "curricUid": "53e9b430-88f3-4f87-95fd-f77430379151", "name": "Math", "version": 1, "kind": "Composite", "descriptionRc": "<p>Math Curriculum</p>\n", "locale": "en", "estimatedTimeToComplete": 42, "estimatedTimeToCompleteRequired": 0, "totalLearningUnits": 28, "totalCompletedLearningUnits": 7, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 1, "totalEstimatedAssignments": 1, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "showModuleStatus": false, "defaultAllottedTime": 0, "isSingleAssignment": false, "children": [{ "curricKey": "M5QF7KN4X-1", "curricUid": "6af13155-a5b1-4741-878c-c6e4d664f73b", "name": "Addition", "version": 1, "kind": "Module", "descriptionRc": "<p>Addition Module</p>\n", "locale": "en", "estimatedTimeToComplete": 0, "estimatedTimeToCompleteRequired": 0, "learningUnitCount": 7, "totalLearningUnits": 7, "totalCompletedLearningUnits": 7, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 1, "totalEstimatedAssignments": 0, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "moduleStatus": "None", "defaultAllottedTime": 0, "isSingleAssignment": false, "assignments": [{ "assignmentKey": "JLB6MQSLN", "assignmentUid": "15d7416e-e014-40a3-a323-f28efdd598db", "status": "COMPLETED", "assignmentType": "Learning", "completionAlgorithmType": "Correct1x", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 0, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 7, "numCompletedLearningUnits": 7, "estimatedTimeToComplete": 0, "numLearningUnits": 7, "startedTimestamp": "2022-11-15 23:09:06 -0700", "createdTimestamp": "2022-11-15 23:08:59 -0700", "effectiveTimestamp": null, "completedTimestamp": "2022-11-15 23:09:55 -0700", "expiresTimestamp": null, "canceledTimestamp": null, "canCreateFocusedRefresher": false, "estimatedTimeToCompleteForRefresher": 105, "learningUnitsMastered": 0, "learningUnitsProficient": 7 }, { "assignmentKey": "QE37MPLTT", "assignmentUid": "70ba64d1-305e-4867-ac79-ab83f8fdf505", "status": "IN_PROGRESS", "assignmentType": "Refresher", "completionAlgorithmType": "Correct1x", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 7, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 0, "numCompletedLearningUnits": 0, "estimatedTimeToComplete": 105, "numLearningUnits": 7, "startedTimestamp": "2022-11-15 23:09:57 -0700", "createdTimestamp": "2022-11-15 23:09:57 -0700", "effectiveTimestamp": null, "completedTimestamp": null, "expiresTimestamp": null, "canceledTimestamp": null, "learningUnitsMastered": 0, "learningUnitsProficient": 0 }], "learnerProgress": 25 }, { "curricKey": "HUEA7PH68-1", "curricUid": "2fbb55b5-b876-435d-94d7-33ebcfa8428f", "name": "Multiplication", "version": 1, "kind": "Module", "descriptionRc": "<p>Multiplication Module</p>\n", "locale": "en", "estimatedTimeToComplete": 42, "estimatedTimeToCompleteRequired": 0, "learningUnitCount": 7, "totalLearningUnits": 7, "totalCompletedLearningUnits": 0, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 0, "totalEstimatedAssignments": 1, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "moduleStatus": "None", "defaultAllottedTime": 0, "isSingleAssignment": false, "assignments": [{ "assignmentKey": "TYY8MFM7J", "assignmentUid": "1a725e54-ec60-4197-8342-b7f53d092fe4", "status": "NOT_STARTED", "assignmentType": "Learning", "completionAlgorithmType": "Correct1x", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 7, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 0, "numCompletedLearningUnits": 0, "estimatedTimeToComplete": 42, "numLearningUnits": 7, "startedTimestamp": null, "createdTimestamp": "2022-11-15 23:08:59 -0700", "effectiveTimestamp": null, "completedTimestamp": null, "expiresTimestamp": null, "canceledTimestamp": null, "canCreateFocusedRefresher": false, "learningUnitsMastered": 0, "learningUnitsProficient": 0 }], "learnerProgress": 25 }, { "curricKey": "AMKC7JGAX-1", "curricUid": "7b85a551-b64f-4b8f-93f4-b552b1b5138b", "name": "Addition TA", "version": 1, "kind": "Module", "descriptionRc": null, "locale": "en", "estimatedTimeToComplete": 0, "estimatedTimeToCompleteRequired": 0, "learningUnitCount": 7, "totalLearningUnits": 7, "totalCompletedLearningUnits": 0, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 0, "totalEstimatedAssignments": 0, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "moduleStatus": "None", "defaultAllottedTime": 3600, "isSingleAssignment": false, "assignments": [{ "assignmentKey": "V4CBM956T", "assignmentUid": "7b3731c0-1c28-45e4-a4e4-3e20808e97b5", "status": "NOT_STARTED", "assignmentType": "TimedAssessment", "completionAlgorithmType": "Assessment", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 7, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 0, "numCompletedLearningUnits": 0, "estimatedTimeToComplete": 3600, "numLearningUnits": 7, "startedTimestamp": null, "createdTimestamp": "2022-11-15 23:08:59 -0700", "effectiveTimestamp": null, "completedTimestamp": null, "expiresTimestamp": null, "canceledTimestamp": null, "learningUnitsMastered": 0, "learningUnitsProficient": 0 }], "learnerProgress": 25 }, {
=======
=======
import { HStack, List, ListItem, Text } from '@chakra-ui/react';
>>>>>>> f7d28232c (Feat: finished first round of logic for status texts)
=======
import { Divider, HStack, List, ListItem, Text } from '@chakra-ui/react';
>>>>>>> fb3d63d20 (Feat: update to logic for practice tests)
=======
import { useTranslation } from 'react-i18next';
>>>>>>> d5cdc7d8e (Feat: add i18n texts)

const AssignmentList = () => {
	const { t: i18n } = useTranslation();

	const mockData = {
		displayCurriculum: {
			curricKey: '96WJCR6EP-1',
			curricUid: '53e9b430-88f3-4f87-95fd-f77430379151',
			name: 'Math',
			version: 1,
			kind: 'Composite',
			descriptionRc: '<p>Math Curriculum</p>\n',
			locale: 'en',
			estimatedTimeToComplete: 42,
			estimatedTimeToCompleteRequired: 0,
			totalLearningUnits: 28,
			totalCompletedLearningUnits: 7,
			totalRequiredLearningUnits: 0,
			totalCompletedRequiredLearningUnits: 0,
			totalCompletedAssignments: 1,
			totalEstimatedAssignments: 1,
			totalNotEstimatedAssignments: 0,
			totalOtherAssignments: 0,
			showModuleStatus: false,
			defaultAllottedTime: 0,
			isSingleAssignment: false,
			children: [
				{
					curricKey: 'M5QF7KN4X-1',
					curricUid: '6af13155-a5b1-4741-878c-c6e4d664f73b',
					name: 'Addition',
					version: 1,
					kind: 'Module',
					descriptionRc: '<p>Addition Module</p>\n',
					locale: 'en',
					estimatedTimeToComplete: 0,
					estimatedTimeToCompleteRequired: 0,
					learningUnitCount: 7,
					totalLearningUnits: 7,
					totalCompletedLearningUnits: 7,
					totalRequiredLearningUnits: 0,
					totalCompletedRequiredLearningUnits: 0,
					totalCompletedAssignments: 1,
					totalEstimatedAssignments: 0,
					totalNotEstimatedAssignments: 0,
					totalOtherAssignments: 0,
					moduleStatus: 'None',
					defaultAllottedTime: 0,
					isSingleAssignment: false,
					assignments: [
						{
							assignmentKey: 'JLB6MQSLN',
							assignmentUid: '15d7416e-e014-40a3-a323-f28efdd598db',
							status: 'COMPLETED',
							assignmentType: 'Learning',
							completionAlgorithmType: 'Correct1x',
							learningUnitsCorrect2x: 0,
							learningUnitsUnseen: 0,
							learningUnitsMisinformed: 0,
							learningUnitsUninformed: 0,
							learningUnitsNotSure: 0,
							learningUnitsInformed: 0,
							learningUnitsCorrect1x: 7,
							numCompletedLearningUnits: 7,
							estimatedTimeToComplete: 0,
							numLearningUnits: 7,
							startedTimestamp: '2022-11-15 23:09:06 -0700',
							createdTimestamp: '2022-11-15 23:08:59 -0700',
							effectiveTimestamp: null,
							completedTimestamp: '2022-11-15 23:09:55 -0700',
							expiresTimestamp: null,
							canceledTimestamp: null,
							canCreateFocusedRefresher: false,
							estimatedTimeToCompleteForRefresher: 105,
							learningUnitsMastered: 0,
							learningUnitsProficient: 7,
						},
						{
							assignmentKey: 'QE37MPLTT',
							assignmentUid: '70ba64d1-305e-4867-ac79-ab83f8fdf505',
							status: 'IN_PROGRESS',
							assignmentType: 'Refresher',
							completionAlgorithmType: 'Correct1x',
							learningUnitsCorrect2x: 0,
							learningUnitsUnseen: 7,
							learningUnitsMisinformed: 0,
							learningUnitsUninformed: 0,
							learningUnitsNotSure: 0,
							learningUnitsInformed: 0,
							learningUnitsCorrect1x: 0,
							numCompletedLearningUnits: 0,
							estimatedTimeToComplete: 105,
							numLearningUnits: 7,
							startedTimestamp: '2022-11-15 23:09:57 -0700',
							createdTimestamp: '2022-11-15 23:09:57 -0700',
							effectiveTimestamp: null,
							completedTimestamp: null,
							expiresTimestamp: null,
							canceledTimestamp: null,
							learningUnitsMastered: 0,
							learningUnitsProficient: 0,
						},
					],
					learnerProgress: 25,
				},
				{
					curricKey: 'HUEA7PH68-1',
					curricUid: '2fbb55b5-b876-435d-94d7-33ebcfa8428f',
					name: 'Multiplication',
					version: 1,
					kind: 'Module',
					descriptionRc: '<p>Multiplication Module</p>\n',
					locale: 'en',
					estimatedTimeToComplete: 42,
					estimatedTimeToCompleteRequired: 0,
					learningUnitCount: 7,
					totalLearningUnits: 7,
					totalCompletedLearningUnits: 0,
					totalRequiredLearningUnits: 0,
					totalCompletedRequiredLearningUnits: 0,
					totalCompletedAssignments: 0,
					totalEstimatedAssignments: 1,
					totalNotEstimatedAssignments: 0,
					totalOtherAssignments: 0,
					moduleStatus: 'None',
					defaultAllottedTime: 0,
					isSingleAssignment: false,
					assignments: [
						{
							assignmentKey: 'TYY8MFM7J',
							assignmentUid: '1a725e54-ec60-4197-8342-b7f53d092fe4',
							status: 'NOT_STARTED',
							assignmentType: 'Learning',
							completionAlgorithmType: 'Correct1x',
							learningUnitsCorrect2x: 0,
							learningUnitsUnseen: 7,
							learningUnitsMisinformed: 0,
							learningUnitsUninformed: 0,
							learningUnitsNotSure: 0,
							learningUnitsInformed: 0,
							learningUnitsCorrect1x: 0,
							numCompletedLearningUnits: 0,
							estimatedTimeToComplete: 42,
							numLearningUnits: 7,
							startedTimestamp: null,
							createdTimestamp: '2022-11-15 23:08:59 -0700',
							effectiveTimestamp: null,
							completedTimestamp: null,
							expiresTimestamp: null,
							canceledTimestamp: null,
							canCreateFocusedRefresher: false,
							learningUnitsMastered: 0,
							learningUnitsProficient: 0,
						},
					],
					learnerProgress: 25,
				},
				{
					curricKey: 'AMKC7JGAX-1',
					curricUid: '7b85a551-b64f-4b8f-93f4-b552b1b5138b',
					name: 'Addition TA',
					version: 1,
					kind: 'Module',
					descriptionRc: null,
					locale: 'en',
					estimatedTimeToComplete: 0,
					estimatedTimeToCompleteRequired: 0,
					learningUnitCount: 7,
					totalLearningUnits: 7,
					totalCompletedLearningUnits: 0,
					totalRequiredLearningUnits: 0,
					totalCompletedRequiredLearningUnits: 0,
					totalCompletedAssignments: 0,
					totalEstimatedAssignments: 0,
					totalNotEstimatedAssignments: 0,
					totalOtherAssignments: 0,
					moduleStatus: 'None',
					defaultAllottedTime: 3600,
					isSingleAssignment: false,
					assignments: [
						{
							assignmentKey: 'V4CBM956T',
							assignmentUid: '7b3731c0-1c28-45e4-a4e4-3e20808e97b5',
							status: 'NOT_STARTED',
							assignmentType: 'TimedAssessment',
							completionAlgorithmType: 'Assessment',
							learningUnitsCorrect2x: 0,
							learningUnitsUnseen: 7,
							learningUnitsMisinformed: 0,
							learningUnitsUninformed: 0,
							learningUnitsNotSure: 0,
							learningUnitsInformed: 0,
							learningUnitsCorrect1x: 0,
							numCompletedLearningUnits: 0,
							estimatedTimeToComplete: 3600,
							numLearningUnits: 7,
							startedTimestamp: null,
							createdTimestamp: '2022-11-15 23:08:59 -0700',
							effectiveTimestamp: null,
							completedTimestamp: null,
							expiresTimestamp: null,
							canceledTimestamp: null,
							learningUnitsMastered: 0,
							learningUnitsProficient: 0,
						},
					],
					learnerProgress: 25,
				},
				{
					curricKey: 'WKV97URSA-1',
					curricUid: '30ee6759-a6ef-4edb-9029-4a1f5e416dcc',
					name: 'Multiplication TA',
					version: 1,
					kind: 'Module',
					descriptionRc: null,
					locale: 'en',
					estimatedTimeToComplete: 0,
					estimatedTimeToCompleteRequired: 0,
					learningUnitCount: 7,
					totalLearningUnits: 7,
					totalCompletedLearningUnits: 0,
					totalRequiredLearningUnits: 0,
					totalCompletedRequiredLearningUnits: 0,
					totalCompletedAssignments: 0,
					totalEstimatedAssignments: 0,
					totalNotEstimatedAssignments: 0,
					totalOtherAssignments: 0,
					moduleStatus: 'None',
					defaultAllottedTime: 3600,
					isSingleAssignment: false,
					assignments: [
						{
							assignmentKey: 'DBHAMHAGA',
							assignmentUid: '7c08413d-9521-43e3-85e5-a476d957fa08',
							status: 'NOT_STARTED',
							assignmentType: 'TimedAssessment',
							completionAlgorithmType: 'Assessment',
							learningUnitsCorrect2x: 0,
							learningUnitsUnseen: 7,
							learningUnitsMisinformed: 0,
							learningUnitsUninformed: 0,
							learningUnitsNotSure: 0,
							learningUnitsInformed: 0,
							learningUnitsCorrect1x: 0,
							numCompletedLearningUnits: 0,
							estimatedTimeToComplete: 3600,
							numLearningUnits: 7,
							startedTimestamp: null,
							createdTimestamp: '2022-11-15 23:08:59 -0700',
							effectiveTimestamp: null,
							completedTimestamp: null,
							expiresTimestamp: null,
							canceledTimestamp: null,
							learningUnitsMastered: 0,
							learningUnitsProficient: 0,
						},
					],
					learnerProgress: 25,
				},
			],
			learnerProgress: 25,
		},
		assignmentStatistics: null,
		reviewHeaderResource: null,
	};

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const mockData = {
    "displayCurriculum": {
<<<<<<< HEAD
      "curricKey": "96WJCR6EP-1", "curricUid": "53e9b430-88f3-4f87-95fd-f77430379151", "name": "Math", "version": 1, "kind": "Composite", "descriptionRc": "<p>Math Curriculum</p>\n", "locale": "en", "estimatedTimeToComplete": 42, "estimatedTimeToCompleteRequired": 0, "totalLearningUnits": 28, "totalCompletedLearningUnits": 7, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 1, "totalEstimatedAssignments": 1, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "showModuleStatus": false, "defaultAllottedTime": 0, "isSingleAssignment": false, "children": [{ "curricKey": "M5QF7KN4X-1", "curricUid": "6af13155-a5b1-4741-878c-c6e4d664f73b", "name": "Addition", "version": 1, "kind": "Module", "descriptionRc": "<p>Addition Module</p>\n", "locale": "en", "estimatedTimeToComplete": 0, "estimatedTimeToCompleteRequired": 0, "learningUnitCount": 7, "totalLearningUnits": 7, "totalCompletedLearningUnits": 7, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 1, "totalEstimatedAssignments": 0, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "moduleStatus": "None", "defaultAllottedTime": 0, "isSingleAssignment": false, "assignments": [{ "assignmentKey": "JLB6MQSLN", "assignmentUid": "15d7416e-e014-40a3-a323-f28efdd598db", "status": "COMPLETED", "assignmentType": "Learning", "completionAlgorithmType": "Correct1x", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 0, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 7, "numCompletedLearningUnits": 7, "estimatedTimeToComplete": 0, "numLearningUnits": 7, "startedTimestamp": "2022-11-15 23:09:06 -0700", "createdTimestamp": "2022-11-15 23:08:59 -0700", "effectiveTimestamp": null, "completedTimestamp": "2022-11-15 23:09:55 -0700", "expiresTimestamp": null, "canceledTimestamp": null, "canCreateFocusedRefresher": false, "estimatedTimeToCompleteForRefresher": 105, "learningUnitsMastered": 0, "learningUnitsProficient": 7 }, { "assignmentKey": "QE37MPLTT", "assignmentUid": "70ba64d1-305e-4867-ac79-ab83f8fdf505", "status": "IN_PROGRESS", "assignmentType": "Refresher", "completionAlgorithmType": "Correct1x", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 7, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 0, "numCompletedLearningUnits": 0, "estimatedTimeToComplete": 105, "numLearningUnits": 7, "startedTimestamp": "2022-11-15 23:09:57 -0700", "createdTimestamp": "2022-11-15 23:09:57 -0700", "effectiveTimestamp": null, "completedTimestamp": null, "expiresTimestamp": null, "canceledTimestamp": null, "learningUnitsMastered": 0, "learningUnitsProficient": 0 }], "learnerProgress": 25 }, { "curricKey": "HUEA7PH68-1", "curricUid": "2fbb55b5-b876-435d-94d7-33ebcfa8428f", "name": "Multiplication", "version": 1, "kind": "Module", "descriptionRc": "<p>Multiplication Module</p>\n", "locale": "en", "estimatedTimeToComplete": 42, "estimatedTimeToCompleteRequired": 0, "learningUnitCount": 7, "totalLearningUnits": 7, "totalCompletedLearningUnits": 0, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 0, "totalEstimatedAssignments": 1, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "moduleStatus": "None", "defaultAllottedTime": 0, "isSingleAssignment": false, "assignments": [{ "assignmentKey": "TYY8MFM7J", "assignmentUid": "1a725e54-ec60-4197-8342-b7f53d092fe4", "status": "NOT_STARTED", "assignmentType": "Learning", "completionAlgorithmType": "Correct1x", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 7, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 0, "numCompletedLearningUnits": 0, "estimatedTimeToComplete": 42, "numLearningUnits": 7, "startedTimestamp": null, "createdTimestamp": "2022-11-15 23:08:59 -0700", "effectiveTimestamp": null, "completedTimestamp": null, "expiresTimestamp": null, "canceledTimestamp": null, "canCreateFocusedRefresher": false, "learningUnitsMastered": 0, "learningUnitsProficient": 0 }], "learnerProgress": 25 }, { "curricKey": "AMKC7JGAX-1", "curricUid": "7b85a551-b64f-4b8f-93f4-b552b1b5138b", "name": "Addition TA", "version": 1, "kind": "Module", "descriptionRc": null, "locale": "en", "estimatedTimeToComplete": 0, "estimatedTimeToCompleteRequired": 0, "learningUnitCount": 7, "totalLearningUnits": 7, "totalCompletedLearningUnits": 0, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 0, "totalEstimatedAssignments": 0, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "moduleStatus": "None", "defaultAllottedTime": 3600, "isSingleAssignment": false, "assignments": [{ "assignmentKey": "V4CBM956T", "assignmentUid": "7b3731c0-1c28-45e4-a4e4-3e20808e97b5", "status": "NOT_STARTED", "assignmentType": "TimedAssessment", "completionAlgorithmType": "Assessment", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 7, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 0, "numCompletedLearningUnits": 0, "estimatedTimeToComplete": 3600, "numLearningUnits": 7, "startedTimestamp": null, "createdTimestamp": "2022-11-15 23:08:59 -0700", "effectiveTimestamp": null, "completedTimestamp": null, "expiresTimestamp": null, "canceledTimestamp": null, "learningUnitsMastered": 0, "learningUnitsProficient": 0 }], "learnerProgress": 25 }, {
>>>>>>> 7bdc82135 (Feat: create assignmentList component)
=======
      "curricKey": "96WJCR6EP-1",
      "curricUid": "53e9b430-88f3-4f87-95fd-f77430379151", "name": "Math", "version": 1, "kind": "Composite", "descriptionRc": "<p>Math Curriculum</p>\n", "locale": "en", "estimatedTimeToComplete": 42, "estimatedTimeToCompleteRequired": 0, "totalLearningUnits": 28, "totalCompletedLearningUnits": 7, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 1, "totalEstimatedAssignments": 1, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "showModuleStatus": false, "defaultAllottedTime": 0, "isSingleAssignment": false, "children": [{ "curricKey": "M5QF7KN4X-1", "curricUid": "6af13155-a5b1-4741-878c-c6e4d664f73b", "name": "Addition", "version": 1, "kind": "Module", "descriptionRc": "<p>Addition Module</p>\n", "locale": "en", "estimatedTimeToComplete": 0, "estimatedTimeToCompleteRequired": 0, "learningUnitCount": 7, "totalLearningUnits": 7, "totalCompletedLearningUnits": 7, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 1, "totalEstimatedAssignments": 0, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "moduleStatus": "None", "defaultAllottedTime": 0, "isSingleAssignment": false, "assignments": [{ "assignmentKey": "JLB6MQSLN", "assignmentUid": "15d7416e-e014-40a3-a323-f28efdd598db", "status": "COMPLETED", "assignmentType": "Learning", "completionAlgorithmType": "Correct1x", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 0, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 7, "numCompletedLearningUnits": 7, "estimatedTimeToComplete": 0, "numLearningUnits": 7, "startedTimestamp": "2022-11-15 23:09:06 -0700", "createdTimestamp": "2022-11-15 23:08:59 -0700", "effectiveTimestamp": null, "completedTimestamp": "2022-11-15 23:09:55 -0700", "expiresTimestamp": null, "canceledTimestamp": null, "canCreateFocusedRefresher": false, "estimatedTimeToCompleteForRefresher": 105, "learningUnitsMastered": 0, "learningUnitsProficient": 7 }, { "assignmentKey": "QE37MPLTT", "assignmentUid": "70ba64d1-305e-4867-ac79-ab83f8fdf505", "status": "IN_PROGRESS", "assignmentType": "Refresher", "completionAlgorithmType": "Correct1x", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 7, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 0, "numCompletedLearningUnits": 0, "estimatedTimeToComplete": 105, "numLearningUnits": 7, "startedTimestamp": "2022-11-15 23:09:57 -0700", "createdTimestamp": "2022-11-15 23:09:57 -0700", "effectiveTimestamp": null, "completedTimestamp": null, "expiresTimestamp": null, "canceledTimestamp": null, "learningUnitsMastered": 0, "learningUnitsProficient": 0 }], "learnerProgress": 25 }, { "curricKey": "HUEA7PH68-1", "curricUid": "2fbb55b5-b876-435d-94d7-33ebcfa8428f", "name": "Multiplication", "version": 1, "kind": "Module", "descriptionRc": "<p>Multiplication Module</p>\n", "locale": "en", "estimatedTimeToComplete": 42, "estimatedTimeToCompleteRequired": 0, "learningUnitCount": 7, "totalLearningUnits": 7, "totalCompletedLearningUnits": 0, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 0, "totalEstimatedAssignments": 1, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "moduleStatus": "None", "defaultAllottedTime": 0, "isSingleAssignment": false, "assignments": [{ "assignmentKey": "TYY8MFM7J", "assignmentUid": "1a725e54-ec60-4197-8342-b7f53d092fe4", "status": "NOT_STARTED", "assignmentType": "Learning", "completionAlgorithmType": "Correct1x", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 7, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 0, "numCompletedLearningUnits": 0, "estimatedTimeToComplete": 42, "numLearningUnits": 7, "startedTimestamp": null, "createdTimestamp": "2022-11-15 23:08:59 -0700", "effectiveTimestamp": null, "completedTimestamp": null, "expiresTimestamp": null, "canceledTimestamp": null, "canCreateFocusedRefresher": false, "learningUnitsMastered": 0, "learningUnitsProficient": 0 }], "learnerProgress": 25 }, { "curricKey": "AMKC7JGAX-1", "curricUid": "7b85a551-b64f-4b8f-93f4-b552b1b5138b", "name": "Addition TA", "version": 1, "kind": "Module", "descriptionRc": null, "locale": "en", "estimatedTimeToComplete": 0, "estimatedTimeToCompleteRequired": 0, "learningUnitCount": 7, "totalLearningUnits": 7, "totalCompletedLearningUnits": 0, "totalRequiredLearningUnits": 0, "totalCompletedRequiredLearningUnits": 0, "totalCompletedAssignments": 0, "totalEstimatedAssignments": 0, "totalNotEstimatedAssignments": 0, "totalOtherAssignments": 0, "moduleStatus": "None", "defaultAllottedTime": 3600, "isSingleAssignment": false, "assignments": [{ "assignmentKey": "V4CBM956T", "assignmentUid": "7b3731c0-1c28-45e4-a4e4-3e20808e97b5", "status": "NOT_STARTED", "assignmentType": "TimedAssessment", "completionAlgorithmType": "Assessment", "learningUnitsCorrect2x": 0, "learningUnitsUnseen": 7, "learningUnitsMisinformed": 0, "learningUnitsUninformed": 0, "learningUnitsNotSure": 0, "learningUnitsInformed": 0, "learningUnitsCorrect1x": 0, "numCompletedLearningUnits": 0, "estimatedTimeToComplete": 3600, "numLearningUnits": 7, "startedTimestamp": null, "createdTimestamp": "2022-11-15 23:08:59 -0700", "effectiveTimestamp": null, "completedTimestamp": null, "expiresTimestamp": null, "canceledTimestamp": null, "learningUnitsMastered": 0, "learningUnitsProficient": 0 }], "learnerProgress": 25 }, {
>>>>>>> c5bf4fcc4 (Feat: stacked name in list component)
        "curricKey": "WKV97URSA-1", "curricUid": "30ee6759-a6ef-4edb-9029-4a1f5e416dcc",
        "name": "Multiplication TA",
        "version": 1,
        "kind": "Module",
        "descriptionRc": null,
        "locale": "en",
        "estimatedTimeToComplete": 0,
        "estimatedTimeToCompleteRequired": 0,
        "learningUnitCount": 7,
        "totalLearningUnits": 7,
        "totalCompletedLearningUnits": 0,
        "totalRequiredLearningUnits": 0,
        "totalCompletedRequiredLearningUnits": 0,
        "totalCompletedAssignments": 0,
        "totalEstimatedAssignments": 0,
        "totalNotEstimatedAssignments": 0,
        "totalOtherAssignments": 0,
        "moduleStatus": "None",
        "defaultAllottedTime": 3600,
        "isSingleAssignment": false,
        "assignments": [{
          "assignmentKey": "DBHAMHAGA",
          "assignmentUid": "7c08413d-9521-43e3-85e5-a476d957fa08",
          "status": "NOT_STARTED",
          "assignmentType": "TimedAssessment",
          "completionAlgorithmType": "Assessment",
          "learningUnitsCorrect2x": 0,
          "learningUnitsUnseen": 7,
          "learningUnitsMisinformed": 0,
          "learningUnitsUninformed": 0,
          "learningUnitsNotSure": 0,
          "learningUnitsInformed": 0,
          "learningUnitsCorrect1x": 0,
          "numCompletedLearningUnits": 0,
          "estimatedTimeToComplete": 3600,
          "numLearningUnits": 7,
          "startedTimestamp": null,
          "createdTimestamp": "2022-11-15 23:08:59 -0700",
          "effectiveTimestamp": null,
          "completedTimestamp": null,
          "expiresTimestamp": null,
          "canceledTimestamp": null,
          "learningUnitsMastered": 0,
          "learningUnitsProficient": 0
        }],
        "learnerProgress": 25
      }],
      "learnerProgress": 25
    },
    "assignmentStatistics": null,
    "reviewHeaderResource": null
  }
  console.log(mockData.displayCurriculum.children);
  const assignmentList = mockData.displayCurriculum.children.map((curriculum) => {
    return (
      <ListItem key={curriculum.name}>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c5bf4fcc4 (Feat: stacked name in list component)
        <HStack _hover={{ textDecoration: 'underline', color: 'ampPrimary.300 ' }} justifyContent={'space-between'}>
          <Text >{curriculum.name}</Text>
          <Text >{curriculum.kind}</Text>
        </HStack>
<<<<<<< HEAD
=======
        <Text _hover={{ color: 'green' }}>{curriculum.name}</Text>
>>>>>>> 7bdc82135 (Feat: create assignmentList component)
=======
>>>>>>> c5bf4fcc4 (Feat: stacked name in list component)
      </ListItem>
    )
  });
  return (
    <List spacing={3} bg="ampWhite" borderRadius={'5px'} padding={'16px'} border={'1px'} borderColor={'ampNeutral.300'}>
      {assignmentList}
    </List>)
}
<<<<<<< HEAD
=======
	console.log(mockData);

=======
>>>>>>> 527888618 (Chore: clean up console logs)
=======
	useEffect(() => {
		const star = getAssignments();
		console.log(star);
	}, []);

>>>>>>> 160ffbe83 (Feat: create assignment service)
	const getAssignmentText = (assignment) => {
		if (assignment.assignmentType !== 'TimedAssessment') {
			switch (assignment.status) {
				case 'NOT_STARTED': {
					return (
						<Text fontSize={'12px'}>
							{assignment.estimatedTimeToComplete &&
								`~${
									Math.floor(assignment.estimatedTimeToComplete / 60) >= 1
										? Math.floor(assignment.estimatedTimeToComplete / 60)
										: '1'
								}
							${
								Math.floor(assignment.estimatedTimeToComplete / 60) > 1
									? i18n('mins')
									: i18n('min')
							}`}
						</Text>
					);
					break;
				}
				case 'IN_PROGRESS': {
					return (
						<Text fontSize={'12px'}>
							{`~${
								Math.floor(assignment.estimatedTimeToComplete / 60) >= 1
									? Math.floor(assignment.estimatedTimeToComplete / 60)
									: '1'
							}
							${
								Math.floor(assignment.estimatedTimeToComplete / 60) > 1
									? i18n('mins')
									: i18n('min')
							}
							left`}
						</Text>
					);
					break;
				}
				case 'COMPLETED': {
					return <Text fontSize={'12px'}>{i18n('refresherAvailable')}</Text>;
					break;
				}
			}
		} else {
			switch (assignment.status) {
				case 'NOT_STARTED': {
					return (
						<Text fontSize={'12px'}>
							{assignment.estimatedTimeToComplete &&
								`${
									Math.floor(assignment.estimatedTimeToComplete / 60) >= 1
										? Math.floor(assignment.estimatedTimeToComplete / 60)
										: '1'
								}	${i18n('minToComplete')}`}
						</Text>
					);
					break;
				}
				case 'COMPLETED': {
					return <Text fontSize={'12px'}>{i18n('attempts')}</Text>;
					break;
				}
=======
	console.log(mockData.displayCurriculum.children);
=======
	console.log(mockData);
>>>>>>> fb3d63d20 (Feat: update to logic for practice tests)

=======
>>>>>>> 527888618 (Chore: clean up console logs)
	const getAssignmentText = (assignment) => {
		if (assignment.assignmentType !== 'TimedAssessment') {
			switch (assignment.status) {
				case 'NOT_STARTED': {
					return (
						<Text fontSize={'12px'}>
							{assignment.estimatedTimeToComplete &&
								`~${
									Math.floor(assignment.estimatedTimeToComplete / 60) >= 1
										? Math.floor(assignment.estimatedTimeToComplete / 60)
										: '1'
								}
							${
								Math.floor(assignment.estimatedTimeToComplete / 60) > 1
									? i18n('mins')
									: i18n('min')
							}`}
						</Text>
					);
					break;
				}
				case 'IN_PROGRESS': {
					return (
						<Text fontSize={'12px'}>
							{`~${
								Math.floor(assignment.estimatedTimeToComplete / 60) >= 1
									? Math.floor(assignment.estimatedTimeToComplete / 60)
									: '1'
							}
							${
								Math.floor(assignment.estimatedTimeToComplete / 60) > 1
									? i18n('mins')
									: i18n('min')
							}
							left`}
						</Text>
					);
					break;
				}
				case 'COMPLETED': {
					return <Text fontSize={'12px'}>{i18n('refresherAvailable')}</Text>;
					break;
				}
			}
<<<<<<< HEAD
			case 'IN_PROGRESS': {
				return (
					<Text fontSize={'12px'}>
						~{Math.floor(assignment.estimatedTimeToComplete / 60)}{' '}
						{Math.floor(assignment.estimatedTimeToComplete / 60) > 1
							? 'mins'
							: 'min'}{' '}
						left
					</Text>
				);
				break;
			}
			case 'COMPLETED': {
				return <Text fontSize={'12px'}>Refresher available</Text>;
				break;
>>>>>>> f7d28232c (Feat: finished first round of logic for status texts)
=======
		} else {
			switch (assignment.status) {
				case 'NOT_STARTED': {
					return (
						<Text fontSize={'12px'}>
							{assignment.estimatedTimeToComplete &&
								`${
									Math.floor(assignment.estimatedTimeToComplete / 60) >= 1
										? Math.floor(assignment.estimatedTimeToComplete / 60)
										: '1'
								}	${i18n('minToComplete')}`}
						</Text>
					);
					break;
				}
				case 'COMPLETED': {
					return <Text fontSize={'12px'}>{i18n('attempts')}</Text>;
					break;
				}
>>>>>>> fb3d63d20 (Feat: update to logic for practice tests)
			}
		}
	};

	const assignmentList = mockData.displayCurriculum.children.map(
<<<<<<< HEAD
<<<<<<< HEAD
		(curriculum, index) => {
			const assignment =
				curriculum.assignments[curriculum.assignments.length - 1];

			return (
				<ListItem height={'44px'} padding={'4px'} key={curriculum.name}>
					<HStack justifyContent={'space-between'} paddingBottom={'10px'}>
						<Text
							_hover={{
								textDecoration: 'underline',
								color: 'ampPrimary.300 ',
								cursor: 'pointer',
							}}
							fontSize={'21px'}
							fontWeight={'bold'}>
=======
		(curriculum) => {
=======
		(curriculum, index) => {
>>>>>>> fb3d63d20 (Feat: update to logic for practice tests)
			const assignment =
				curriculum.assignments[curriculum.assignments.length - 1];

			console.log(assignment);

			return (
				<ListItem height={'44px'} padding={'4px'} key={curriculum.name}>
<<<<<<< HEAD
					<HStack
						_hover={{ textDecoration: 'underline', color: 'ampPrimary.300 ' }}
						justifyContent={'space-between'}>
						<Text fontSize={'21px'} fontWeight={'bold'}>
>>>>>>> f7d28232c (Feat: finished first round of logic for status texts)
=======
					<HStack justifyContent={'space-between'} paddingBottom={'10px'}>
						<Text
							_hover={{
								textDecoration: 'underline',
								color: 'ampPrimary.300 ',
								cursor: 'pointer',
							}}
							fontSize={'21px'}
							fontWeight={'bold'}>
>>>>>>> fb3d63d20 (Feat: update to logic for practice tests)
							{curriculum.name}
						</Text>
						<Text>{getAssignmentText(assignment)}</Text>
					</HStack>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fb3d63d20 (Feat: update to logic for practice tests)
					{index !== mockData.displayCurriculum.children.length - 1 && (
						<Divider
							borderWidth="1px"
							borderStyle="solid"
							borderRadius="10"
							borderColor="#AFB3B4"
						/>
					)}
<<<<<<< HEAD
=======
>>>>>>> f7d28232c (Feat: finished first round of logic for status texts)
=======
>>>>>>> fb3d63d20 (Feat: update to logic for practice tests)
				</ListItem>
			);
		},
	);
	return (
		<List
			spacing={3}
			bg="ampWhite"
			borderRadius={'12px'}
			padding={'16px'}
			border={'1px'}
			borderColor={'ampNeutral.300'}
			width={'800px'}>
			{assignmentList}
		</List>
	);
};
<<<<<<< HEAD
>>>>>>> fb3d63d20 (Feat: update to logic for practice tests)
=======
>>>>>>> 7bdc82135 (Feat: create assignmentList component)
=======
>>>>>>> f7d28232c (Feat: finished first round of logic for status texts)

export default AssignmentList;
