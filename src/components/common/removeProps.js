import { mapProps } from 'recompose'
import omit from 'lodash/omit'


export default propsNames => mapProps(props => omit(props, propsNames))
