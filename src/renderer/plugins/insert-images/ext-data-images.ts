import { KeyType } from '@blink-mind/core';
import { List, Map, Record } from 'immutable';
type ImageRecordType = {
  key: KeyType;
  url: string;
  width: number;
  height: number;
};

const defaultImageRecord: ImageRecordType = {
  key: null,
  url: null,
  width: null,
  height: null
};

export class ImageRecord extends Record(defaultImageRecord) {
  get key(): KeyType {
    return this.get('key');
  }

  get url(): string {
    return this.get('url');
  }

  get width(): number {
    return this.get('width');
  }

  get height(): number {
    return this.get('height');
  }
}

type TopicImageRecordType = {
  key: KeyType;
  width: number;
  height: number;
};

const defaultTopicImageRecord: TopicImageRecordType = {
  key: null,
  width: null,
  height: null
};

export class TopicImageRecord extends Record(defaultTopicImageRecord) {
  get key() {
    return this.get('key');
  }

  get width() {
    return this.get('width');
  }

  get height() {
    return this.get('height');
  }
}

type ExtDataImagesRecordType = {
  images: Map<KeyType, ImageRecord>;
  topics: Map<KeyType, List<TopicImageRecord>>;
};

const defaultExtDataImagesRecord: ExtDataImagesRecordType = {
  images: Map(),
  topics: Map()
};

// images 和 topics 分开管理，
export class ExtDataImages extends Record(defaultExtDataImagesRecord) {
  get images(): Map<KeyType, ImageRecord> {
    return this.get('images');
  }
  get topics(): Map<KeyType, List<TopicImageRecord>> {
    return this.get('topics');
  }
}

export type TopicImageData = {
  key: KeyType;
  imageRecord: ImageRecord,
  width: number;
  height: number;
}
