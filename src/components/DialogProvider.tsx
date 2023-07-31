import { createContext, ReactNode, useContext, useState } from 'react';
import DataServiceExceptionComponent from './ui/DataServiceExceptionComponent';
import { useFetcher } from 'react-router-dom';

interface DialogProviderType {
	showAlert: boolean;
	setShowAlert(showAlert: boolean): void;
}

const DialogContext = createContext<DialogProviderType | null>({
	showAlert: false,
	setShowAlert: () => {},
});

type DialogProviderProps = {
	children: ReactNode; // Define the type for children as ReactNode
};

const DialogProvider = ({ children }: DialogProviderProps) => {
	const [showAlert, setShowAlert] = useState(false);
	const fetcher = useFetcher();
	return (
		<DialogContext.Provider
			value={{
				showAlert,
				setShowAlert,
			}}>
			{children}
			<DataServiceExceptionComponent
				isOpen={showAlert}
				setShowAlert={setShowAlert}
				fetcher={fetcher}
			/>
		</DialogContext.Provider>
	);
};

export const useDialogContext = () => useContext(DialogContext);

export default DialogProvider;
