import axiosInstance from '@/utils/axios';
import { onMounted, type Ref, ref, watch } from 'vue';

export type TPaginationData<T> = {
  called: Ref<boolean>;
  loading: Ref<boolean>;
  limit: Ref<number>;
  total: Ref<number>;
  data: Ref<T[]>;
  fetchData: () => Promise<void>;
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
  const page = ref(1);
  const limit = ref(30);
  const total = ref(0);
  const data = ref<T[]>([]) as Ref<T[]>;

  const fetchData = async () => {
    loading.value = true;

    try {
      const response = await axiosInstance.get<T[]>(url, {
        params: {
          _page: page.value,
          _limit: limit.value,
        },
      });
      total.value = response.headers['x-total-count'];

      data.value = response.data || [];
    } catch {
      data.value = [];
    } finally {
      called.value = true;
      loading.value = false;
    }
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

  watch(limit, () => {
    fetchData();
  });

  onMounted(() => {
    fetchData();
  });

  return {
    called,
    loading,
    limit,
    total,
    data,
    fetchData,
    onUpdate,
    onDelete,
  };
};

export default usePaginationData;
