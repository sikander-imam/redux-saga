import { all, takeEvery, put, call } from 'redux-saga/effects';
import { getBlogList, getBlogDetails, getBlogCategories, addBlog, getBlog, addBlogTranslations } from '../../services/blog';
import { message } from 'antd';
import { history } from 'index';
import actions from './actions';

export function* LIST({ payload }) {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: true,
    },
  });
  const success = yield call(getBlogList, payload);
  if (success) {
    yield put({
      type: 'blog/SET_STATE',
      payload: {
        loading: false,
        blogs: success.blogs,
      },
    });
  } else {
    yield put({
      type: 'blog/SET_STATE',
      payload: {
        loading: false,
      },
    });
  }
}

export function* BLOG_DETAILS({ payload }) {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: true,
    },
  });
  const success = yield call(getBlogDetails, payload);

  if (success) {
    yield put({
      type: 'blog/SET_STATE',
      payload: { blogDetail: success.blogDetail },
    });
  } else {
    yield put({
      type: 'blog/SET_STATE',
      payload: {
        loading: false,
      },
    });
  }
}

export function* BLOG_GET_CATEGORIES({ payload }) {
  yield put({
    type: actions.SET_INTERNAL_STATE,
    payload: {
      field: 'categories',
      categories: {
        list: [],
        listing: true,
      }
    },
  });
  const response = yield call(getBlogCategories);
  if (response.status) {
    yield put({
      type: actions.SET_INTERNAL_STATE,
      payload: {
        field: 'categories',
        categories: {
          listing: false,
          list: response.data?.Category || [],
        }
      },
    });
  } else {
    yield put({
      type: actions.SET_INTERNAL_STATE,
      payload: {
        field: 'categories',
        categories: {
          list: [],
          listing: false,
        }
      },
    });
  }
}

export function* BLOG_GET_BLOG({ payload }) {
  yield put({
    type: actions.SET_INTERNAL_STATE,
    payload: {
      field: 'blog',
      blog: {
        getting: true,
        details: false,
      }
    },
  });
  const response = yield call(getBlog, payload.id);
  if (response.status) {
    yield put({
      type: actions.SET_INTERNAL_STATE,
      payload: {
        field: 'blog',
        blog: {
          getting: false,
          details: response.data?.Blog?.[0] || false,
        }
      },
    });
  } else {
    yield put({
      type: actions.SET_INTERNAL_STATE,
      payload: {
        field: 'blog',
        blog: {
          getting: false,
          details: false,
        }
      },
    });
  }
}

export function* BLOG_CREATE_BLOG({ payload }) {
  yield put({
    type: actions.SET_INTERNAL_STATE,
    payload: {
      field: 'blog',
      blog: {
        creating: true,
        creatingError: false,
        creatingErrorMessage: '',
      }
    },
  });
  const response = yield call(addBlog, payload);

  if (response.status) {
    const blogId = response.data?.blog_id || "";
    const translationsPayload = [];
    const payloadTranslations = payload.translations?.translation || [];
    for (const payloadTranslation of payloadTranslations) {
      const formData = new FormData();
      formData.append('blog_id', blogId);
      formData.append('id', payloadTranslation.id);
      formData.append('language_id', payloadTranslation.language_id);
      formData.append('translate_des', payloadTranslation.translate_des);
      formData.append('translate_name', payloadTranslation.translate_name);
      if (payloadTranslation.document_url) {
        formData.append('document_url', payloadTranslation.document_url);
      }
      yield call(addBlogTranslations, formData);
    }
  }

  if (response.status) {
    yield put({
      type: actions.SET_INTERNAL_STATE,
      payload: {
        field: 'blog',
        blog: {
          created: true,
          creating: false,
          creatingError: false,
          creatingErrorMessage: '',
        }
      },
    });
    const blog = response.data;
    message.success(payload?.translateMessage(payload.edit ? 'blog.blogEditedSuccessfully' : 'blog.blogAddedSuccessfully'));
    history.push(`/blog/${blog?.blog_id}`);
  } else {
    message.error(payload?.translateMessage('general.SomethingWentWrong'));
    yield put({
      type: actions.SET_INTERNAL_STATE,
      payload: {
        field: 'blog',
        blog: {
          creating: false,
          creatingError: true,
          creatingErrorMessage: response.message,
        }
      },
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.BLOG_LIST, LIST),
    takeEvery(actions.BLOG_DETAILS, BLOG_DETAILS),
    takeEvery(actions.BLOG_GET_BLOG, BLOG_GET_BLOG),
    takeEvery(actions.BLOG_CREATE_BLOG, BLOG_CREATE_BLOG),
    takeEvery(actions.BLOG_GET_CATEGORIES, BLOG_GET_CATEGORIES),
    // LIST(),
  ]);
}
