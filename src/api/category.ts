import { COLLECTION } from '@/constants';
import {
  addDocument,
  deleteDocument,
  getDocuments,
  updateDocument,
} from '@/firebase/crud';
export interface CategoryWithoutId {
  name: string;
}

export interface Category extends CategoryWithoutId {
  id: string;
}

export const getCategories = async () => {
  const doc = await getDocuments(COLLECTION.Categories);
  const arr = doc.docs;
  return arr.map((v) => ({
    ...v.data(),
    id: v.id,
  })) as Category[];
};

export const deleteCategory = (id: string) => {
  return deleteDocument(COLLECTION.Categories, id);
};

export const addCategory = async (newCate: CategoryWithoutId) => {
  const data = { ...newCate };
  data.name = data.name.trim();

  return addDocument(COLLECTION.Categories, data);
};

export const updateCategory = async (
  id: string,
  updatedData: Partial<CategoryWithoutId>,
) => {
  const data = { ...updatedData };
  if (data.name) data.name = data.name.trim();
  return updateDocument(COLLECTION.Categories, id, data);
};

export default {
  getCategories,
  deleteCategory,
  addCategory,
  updateCategory,
};
