export type HOC<InProps: {}, OutProps: {}> = (ComponentType<InProps>) => ComponentType<OutProps>
