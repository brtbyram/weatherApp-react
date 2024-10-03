import { createElement } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'


function Button({ children, variant, size, as, ...props }) {
    return createElement(as, {
        ...props,
        className: clsx('rounded px-4 py-2', {
            'flex items-center justify-center mx-auto px-8 py-4 duration-700 transition-all font-semibold border rounded-xl bg-gray-100/10': variant === 'primary',
            'bg-light text-black': variant === 'light',
            'bg-white text-primary border': size === 'small',
            'bg-white text-primary border border-primary': variant === 'primary-outline'
        })
    },
        children)
}

export default Button

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    variant: PropTypes.oneOf(['primary', 'light', 'primary-outline']),
    size: PropTypes.oneOf(['normal', 'large', 'small']),
    as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    props: PropTypes.object,
    className: PropTypes.string
}
Button.defaultProps = {
    as: 'button',
    variant: 'primary',
    size: 'normal'
}