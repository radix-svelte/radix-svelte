export function createRefAction<TEventHandlerMap extends EventHandlerMap = object>(
	setNode: (node?: HTMLElement | null) => void,
	eventHandlers?: TEventHandlerMap
): RefAction<TEventHandlerMap> {
	const eventHandlerEntries = Object.entries(eventHandlers || {});

	const action: any = (node: HTMLElement) => {
		setNode(node);
		eventHandlerEntries.forEach(([event, [handler, options]]) => {
			node.addEventListener(event, handler, options);
		});
		return {
			destroy() {
				setNode(null);
				eventHandlerEntries.forEach(([event, [handler, options]]) => {
					node.removeEventListener(event, handler, options);
				});
			},
		};
	};

	eventHandlerEntries.forEach(([event, [handler]]) => {
		const handlerName = `on${event.charAt(0).toUpperCase()}${event.slice(1)}`;
		action[handlerName] = handler;
	});
	return action;
}

type EventHandlerMap = Partial<Record<keyof HTMLElementEventMap, EventHandler>>;

export type EventHandler = [(ev: Event) => void, boolean | AddEventListenerOptions | undefined];

type $EventHandlerNames<TEventHandlerMap extends EventHandlerMap> = {
	[TKey in keyof TEventHandlerMap]: TKey extends string ? `on${Capitalize<TKey>}` : never;
}[keyof TEventHandlerMap];

type EventHandlers<TEventHandlerMap extends EventHandlerMap> = {
	[TKey in $EventHandlerNames<TEventHandlerMap>]: (ev: Event) => void;
};

interface ActionCleanup {
	destroy(): void;
}

export type RefAction<TEventHandlerMap extends EventHandlerMap = object> = ((
	node: HTMLElement
) => ActionCleanup) &
	EventHandlers<TEventHandlerMap>;
