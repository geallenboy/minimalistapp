import { Box, Paper, Typography } from '@mui/material';

import { MotionInView } from '@/components/animate';
import Scrollbar from '@/components/Scrollbar';

import getVariant from '../getVariant';

export default function ContainerView({ selectVariant, sx, ...other }: any) {
  return (
    <Paper
      sx={{
        height: 480,
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        ...sx
      }}
      {...other}
    >
      <Scrollbar>
        {[...Array(40)].map((_, index: number) => (
          <MotionInView key={index} variants={getVariant(selectVariant)}>
            <Box
              sx={{
                my: 2,
                mx: 'auto',
                height: 72,
                maxWidth: 480,
                display: 'flex',
                borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                boxShadow: (theme: any) => theme.customShadows.z8
              }}
            >
              <Typography variant="body2">Item {index + 1}</Typography>
            </Box>
          </MotionInView>
        ))}
      </Scrollbar>
    </Paper>
  );
}
