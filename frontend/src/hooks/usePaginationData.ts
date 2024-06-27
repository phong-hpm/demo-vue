import axiosInstance from '@/utils/axios';
import { onMounted, type Ref, ref, watch } from 'vue';
import _ from 'lodash';

export type TPaginationData<T> = {
  called: Ref<boolean>;
  loading: Ref<boolean>;
  loadingMore: Ref<boolean>;
  limit: Ref<number>;
  total: Ref<number>;
  data: Ref<T[]>;
  onLoad: () => Promise<void>;
  onLoadMore: () => Promise<void>;
  onUpdate: (entity: T) => void;
  onDelete: (id: string) => void;
};

type TUsePaginationDataParams = {
  url: string;
};

const usePaginationData = <T extends { id: string }>({
  url,
}: TUsePaginationDataParams): TPaginationData<T> => {
  const called = ref(false);
  const loading = ref(true);
  const loadingMore = ref(false);

  const page = ref(1);
  const limit = ref(30);
  const total = ref(0);

  const data = ref<T[]>([]) as Ref<T[]>;

  const onLoad = async () => {
    if (!data.value.length) {
      loading.value = true;
    }

    try {
      const response = await axiosInstance.get<T[]>(url, {
        params: {
          _page: page.value,
          _limit: limit.value,
        },
      });
      total.value = response.headers['x-total-count'];

      data.value = _.uniqBy([...data.value, ...(response.data || [])], ({ id }) => id);
    } catch {
      data.value = [];
    } finally {
      called.value = true;
      loading.value = false;
      loadingMore.value = false;
    }
  };

  const onLoadMore = async () => {
    if (data.value.length >= total.value) return;
    page.value = Number(page.value) + 1;
    loadingMore.value = true;
  };

  const onUpdate = (entity: T) => {
    const existing = data.value.some(({ id }) => id === entity.id);
    if (existing) {
      data.value = data.value.map((item) => {
        if (item.id === entity.id) return entity;
        return item;
      });
    } else {
      data.value = [entity, ...data.value];
      total.value = Number(total.value) + 1;
    }
  };

  const onDelete = (id: string) => {
    data.value = data.value.filter((item) => item.id !== id);
    total.value = Number(total.value) - 1;
  };

  onMounted(() => {
    onLoad();
  });

  watch([page, limit], () => {
    onLoad();
  });

  return {
    called,
    loading,
    loadingMore,
    limit,
    total,
    data,
    onLoad,
    onLoadMore,
    onUpdate,
    onDelete,
  };
};

export default usePaginationData;
