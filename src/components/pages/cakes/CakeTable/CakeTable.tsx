'use client';

import { QUERY_KEY } from '@/api/queryKeys';

import { useQuery } from '@tanstack/react-query';
import { Box, Chip, IconButton, Input, Skeleton, Typography } from '@mui/joy';
import {
  Add,
  ClearOutlined,
  FilterAltOutlined,
  SearchOutlined,
  SentimentDissatisfiedOutlined,
} from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { getCakes } from '@/api/cake';
import { normalizeStr } from '@/utils/string-utils';
import CakeTableRow from './CakeTableRow';
import { getCategories } from '@/api/category';
import { isAinB } from '@/utils/array-utils';
import CakeModal from './CakeModal/CakeModal';
import {
  Age,
  AgeStr,
  Gender,
  GenderStr,
  ageKeys,
  genderKeys,
} from '@/constants';

export default function CakeTable() {
  const getCategoryQR = useQuery({
    queryKey: [QUERY_KEY.Categories],
    queryFn: getCategories,
  });
  const categories = getCategoryQR.data;

  const getCakeQR = useQuery({
    queryKey: [QUERY_KEY.Cakes],
    queryFn: () => getCakes(categories),
    enabled: !!categories,
  });
  const cakes = getCakeQR.data;

  const [searchWord, setSearchWord] = useState('');

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedAge, setSelectedAge] = useState<Age | null>(null);

  const [openAddModal, setOpenAddModal] = useState(false);

  const renderedCakes = useMemo(() => {
    if (!cakes) return [];
    let result = [];
    result = cakes.filter(({ name }) =>
      normalizeStr(name).includes(normalizeStr(searchWord)),
    );
    result = result.filter(({ categoryIds }) =>
      isAinB(selectedCategories, categoryIds),
    );
    if (selectedGender !== null)
      result = result.filter(({ gender }) => gender === selectedGender);
    if (selectedAge !== null)
      result = result.filter(({ age }) => age === selectedAge);

    return result;
  }, [
    searchWord,
    cakes,
    selectedCategories,
    showFilter,
    selectedGender,
    selectedAge,
  ]);

  const onClickChip = (id: string) => {
    const newCheckedChips = selectedCategories.slice();
    const index = newCheckedChips.indexOf(id);
    if (index === -1) {
      newCheckedChips.push(id);
    } else {
      newCheckedChips.splice(index, 1);
    }
    setSelectedCategories(newCheckedChips);
  };

  const onClickGender = (gender: Gender) => {
    setSelectedGender(selectedGender === gender ? null : gender);
  };

  const onClickAge = (age: Age) => {
    setSelectedAge(selectedAge === age ? null : age);
  };

  const isFilterByTag = selectedAge !== null || selectedGender !== null;

  return (
    <>
      <Box display='flex' gap={1}>
        <Input
          placeholder='Tìm kiếm'
          startDecorator={<SearchOutlined />}
          size='md'
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          fullWidth
          endDecorator={
            searchWord ? (
              <IconButton
                size='sm'
                onClick={() => setSearchWord('')}
                sx={{ borderRadius: '50%' }}
              >
                <ClearOutlined />
              </IconButton>
            ) : null
          }
        />
        <IconButton
          variant={isFilterByTag ? 'solid' : 'outlined'}
          color={isFilterByTag ? 'primary' : 'neutral'}
          onClick={() => setShowFilter((prev) => !prev)}
          disabled={!cakes?.length}
        >
          <FilterAltOutlined />
        </IconButton>
        <IconButton variant='outlined' onClick={() => setOpenAddModal(true)}>
          <Add />
        </IconButton>
      </Box>

      <Box
        display={showFilter ? 'flex' : 'none'}
        gap={0.5}
        flexDirection='column'
        p={1}
        border='1px solid'
        borderColor='neutral.outlinedBorder'
        borderRadius={6}
      >
        <Box display='flex' gap={0.5} flexWrap='wrap'>
          {genderKeys.map((gender) => {
            const checked = selectedGender === gender;
            return (
              <Chip
                key={gender}
                variant={checked ? 'solid' : 'outlined'}
                color={checked ? 'primary' : 'neutral'}
                onClick={() => onClickGender(gender)}
              >
                {GenderStr[gender]}
              </Chip>
            );
          })}
        </Box>
        <Box display='flex' gap={0.5} flexWrap='wrap'>
          {ageKeys.map((age) => {
            const checked = selectedAge === age;
            return (
              <Chip
                key={age}
                variant={checked ? 'solid' : 'outlined'}
                color={checked ? 'primary' : 'neutral'}
                onClick={() => onClickAge(age)}
              >
                {AgeStr[age]} tuổi
              </Chip>
            );
          })}
        </Box>
        {!!categories?.length && (
          <Box display='flex' gap={0.5} flexWrap='wrap'>
            {categories?.map((cate) => {
              const checked = selectedCategories.includes(cate.id);
              return (
                <Chip
                  key={cate.id}
                  variant='outlined'
                  color={checked ? 'primary' : 'neutral'}
                  onClick={() => onClickChip(cate.id)}
                >
                  {cate.name}
                </Chip>
              );
            })}
          </Box>
        )}
      </Box>
      <Box
        flexGrow={1}
        flexBasis={0}
        overflow='auto'
        minHeight='300px'
        display='flex'
        flexDirection='column'
        gap={1}
      >
        {renderedCakes.map((row) => (
          <CakeTableRow key={row.id} {...row} />
        ))}
        {getCakeQR.isPending &&
          Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                variant='rectangular'
                sx={{ borderRadius: '6px', minHeight: '100px' }}
              />
            ))}
        {(isFilterByTag || searchWord) &&
          cakes?.length !== 0 &&
          renderedCakes.length === 0 && (
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color='neutral'
            >
              <SentimentDissatisfiedOutlined />
              &nbsp;Không tìm thấy bánh phù hợp
            </Typography>
          )}
        {!getCakeQR.isPending && cakes?.length === 0 && (
          <Typography color='neutral'>Không có dữ liệu</Typography>
        )}
      </Box>
      <CakeModal open={openAddModal} onClose={() => setOpenAddModal(false)} />
    </>
  );
}
