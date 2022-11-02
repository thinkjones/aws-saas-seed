import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
export const textareaStyles = {
  components: {
    Textarea: {
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: '8px'
        }
      },

      variants: {
        main: (props: StyleFunctionProps) => ({
          field: {
            bg: mode('transparent', 'navy.800')(props),
            border: '1px solid !important',
            color: mode('secondaryGray.900', 'white')(props),
            borderColor: mode('secondaryGray.100', 'whiteAlpha.100')(props),
            borderRadius: '16px',
            fontSize: 'sm',
            p: '20px',
            _placeholder: { color: 'secondaryGray.400' }
          }
        }),
        auth: () => ({
          field: {
            bg: 'white',
            border: '1px solid',
            borderColor: 'secondaryGray.100',
            borderRadius: '16px',
            _placeholder: { color: 'secondaryGray.600' }
          }
        }),
        authSecondary: () => ({
          field: {
            bg: 'white',
            border: '1px solid',

            borderColor: 'secondaryGray.100',
            borderRadius: '16px',
            _placeholder: { color: 'secondaryGray.600' }
          }
        }),
        search: () => ({
          field: {
            border: 'none',
            py: '11px',
            borderRadius: 'inherit',
            _placeholder: { color: 'secondaryGray.600' }
          }
        })
      }
    }
  }
};
