/*
Copyright 2022 The Sigstore Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { preAuthEncoding } from '../../util/dsse';

describe('preAuthEncoding', () => {
  const payloadType = 'text/plain';
  const payload = Buffer.from('Hello, World!', 'utf8');

  it('should return the correct pre-auth encoding', () => {
    const pae = preAuthEncoding(payloadType, payload);
    expect(pae).toEqual(Buffer.from('DSSEv1 10 text/plain 13 Hello, World!'));
  });
});
