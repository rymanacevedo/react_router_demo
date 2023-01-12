import { createContext, useState, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import DataServiceExceptionComponent from './ui/DataServiceExceptionComponent';

interface DialogProviderType {
	showAlert: boolean;
	setShowAlert(showAlert: boolean): void;
}

interface AuthType {
	user: object;
	logout(): void;
	showSessionDialog: boolean;
	setShowSessionDialog(): void;
	staySignedIn: boolean;
	setStaySignedIn(): void;
}

const DialogContext = createContext<DialogProviderType | null>({
	showAlert: false,
	setShowAlert: () => {},
});

const DialogProvider = ({ children }: any) => {
	const { user, logout }: AuthType | any = useAuth();

	const [showAlert, setShowAlert] = useState(false);

	const handleCloseAlert = () => {
		setShowAlert(false);
		if (user) {
			logout();
		}
	};

	return (
		<DialogContext.Provider
			value={{
				showAlert,
				setShowAlert,
			}}>
			{children}
			<DataServiceExceptionComponent
				isOpen={showAlert}
				onClose={() => handleCloseAlert()}
			/>
		</DialogContext.Provider>
	);
};

export const useDialogContext = () => useContext(DialogContext);

export default DialogProvider;
