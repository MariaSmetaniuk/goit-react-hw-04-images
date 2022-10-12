import { ThreeDots } from 'react-loader-spinner';
import { Box } from 'components/Box';

export const Loader = () => {
  return (
    <Box display="flex" justifyContent="center">
      <ThreeDots
        height="90"
        width="90"
        radius="9"
        color="#808080"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </Box>
  );
};
