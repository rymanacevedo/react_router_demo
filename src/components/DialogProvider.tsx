import { createContext, useContext, useState } from 'react';
import DataServiceExceptionComponent from './ui/DataServiceExceptionComponent';
import { useNavigate } from 'react-router-dom';

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
	const [showAlert, setShowAlert] = useState(false);
	const navigate = useNavigate();

	const handleCloseAlert = () => {
		setShowAlert(false);
		navigate('/logout');
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
				onClose={handleCloseAlert}
			/>
		</DialogContext.Provider>
	);
};

export const useDialogContext = () => useContext(DialogContext);

export default DialogProvider;
