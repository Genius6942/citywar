type listener = {type: string, callback: (data: any) => void};

const listeners: listener[] = [];

export const listen = (type: string, callback: (data: any) => void) => {
	listeners.push({ type, callback });
};

export const emit = (type: string, data: any) => {
	listeners.forEach((listener) => {
		if (listener.type === type) {
			listener.callback(data);
		}
	});
}