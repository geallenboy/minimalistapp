import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import { Icon } from '@iconify/react';
import { Avatar, Button, Card, CardHeader, Chip, Rating, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
import Slider from 'react-slick';

import { CarouselControlsArrowsBasic1 } from '@/components/carousel';
import { fDateTime } from '@/utils/formatTime';
import mockData from '@/utils/mock-data';

const MOCK_REVIEWS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  name: mockData.name.fullName(index),
  description: mockData.text.description(index),
  avatar: mockData.image.avatar(index),
  rating: mockData.number.rating(index),
  postedAt: mockData.time(index),
  tags: ['Great Sevice', 'Recommended', 'Best Price']
}));

function ReviewItem({ item }: any) {
  const { avatar, name, description, rating, postedAt, tags } = item;

  return (
    <Stack spacing={2} sx={{ height: 402, position: 'relative', p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={name} src={avatar} />
        <div>
          <Typography variant="subtitle2">{name}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            已发布{fDateTime(postedAt)}
          </Typography>
        </div>
      </Stack>

      <Rating value={rating} size="small" readOnly precision={0.5} />
      <Typography variant="body2">{description}</Typography>

      <Stack direction="row" flexWrap="wrap">
        {tags.map((tag: any) => (
          <Chip size="small" key={tag} label={tag} sx={{ mr: 1, mb: 1, color: 'text.secondary' }} />
        ))}
      </Stack>

      <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ flexGrow: 1 }}>
        <Button fullWidth variant="contained" endIcon={<Icon icon={checkmarkCircle2Fill} />}>
          接受
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          endIcon={<Icon icon={closeCircleFill} />}
        >
          拒绝
        </Button>
      </Stack>
    </Stack>
  );
}

export default function BookingCustomerReviews() {
  const theme = useTheme();
  const carouselRef = useRef<any>(null);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl')
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <CardHeader
        title="Customer Reviews"
        subheader={`${MOCK_REVIEWS.length} Reviews`}
        action={
          <CarouselControlsArrowsBasic1
            arrowLine
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{
              position: 'static',
              '& button': { color: 'text.primary' }
            }}
          />
        }
        sx={{
          '& .MuiCardHeader-action': {
            alignSelf: 'center'
          }
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {MOCK_REVIEWS.map((item) => (
          <ReviewItem key={item.id} item={item} />
        ))}
      </Slider>
    </Card>
  );
}
