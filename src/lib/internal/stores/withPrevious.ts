type SetterOptions = {
	updateAll?: boolean;
};

type Listener<T> = ({ current, previous }: { current: T; previous: T | null }) => void;

export function withPrevious<T>(value: T) {
	let current = value;
	let previous: T | null = null;

	let subscribers: Array<Listener<T>> = [];

	const subscribe = (listener: Listener<T>) => {
		subscribers.push(listener);
		listener({ current, previous });

		return () => {
			subscribers = subscribers.filter((s) => s !== listener);
		};
	};

	const set = (value: T, options?: SetterOptions) => {
		previous = options?.updateAll ? value : current;
		current = value;

		subscribers.forEach((s) => s({ current, previous }));
	};

	const getPrevious = () => previous;

	const currentStore = {
		subscribe,
		set,
		getPrevious,
	};

	return currentStore;
}
