import React, { useEffect } from 'react';
import { get } from 'lodash';
import { useQuery } from 'react-query';
import useURLParams from 'hooks/useURLParams';
import { ADVERTISEMENTS_KEY, getAdvertisements } from './queries';
import { itemTypeShape } from './shapes';
import { formatData } from './utils';
import ListView from './view';

const ListContainer = ({ itemType }) => {
  const { params, updateParams, clearParams } = useURLParams();
  const { data, isLoading, refetch } = useQuery(
    ADVERTISEMENTS_KEY,
    () => getAdvertisements(itemType, params),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    refetch();
  }, [itemType, params]);

  const filtersInitialValues = {
    animalId: params.animalId || '',
    location: params.location || '',
    activityId: params.activityId || '',
    priceMin: params.priceMin || '',
    priceMax: params.priceMax || '',
  };

  const items = get(data, 'data');

  return (
    <ListView
      filtersInitialValues={filtersInitialValues}
      onFiltersSubmit={updateParams}
      onFiltersClear={clearParams}
      data={formatData(items)}
      isLoading={isLoading}
    />
  );
};

ListContainer.propTypes = {
  itemType: itemTypeShape.isRequired,
};

export default ListContainer;
