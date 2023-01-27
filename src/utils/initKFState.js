function setupKFState() {
	window.KF = window.KF || {
		state: {
			activeSubModule: '',
			isSegmentIoConfigured: false,
			user: {
				sessionKey: '',
			},
			homeAccount: {
				acctAbbrevName: null,
				acctUuid: null,
				acctKey: null,
				acctFullName: null,
				is_demo_acct: false,
				pw_min_length: 0,
				pw_min_group: 0,
				pw_max_tries: 0,
			},
			// For localhost we need to change the baseUri so that react can run on one server and the rest of the app runs on tomcat
			baseUri:
				window.location.origin === 'http://localhost:3000'
					? 'http://mybob.amplifire.me:8080'
					: window.location.origin,
			// TODO need to get from server for when we replace LearnerDashboardEntry.java
			amp7LearningUrl:
				window.location.origin === 'http://localhost:3000'
					? 'http://mybob.amplifire.me:8080'
					: window.location.origin,
		},
	};
}

export default setupKFState;
