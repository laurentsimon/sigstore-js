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
const PEM_HEADER = /-----BEGIN (.*)-----/;
const PEM_FOOTER = /-----END (.*)-----/;

// Given a set of PEM-encoded certificates bundled in a single string, returns
// an array of certificates. Standard PEM encoding dictates that each certificate
// should have a trailing newline after the footer.
export function split(certificate: string): string[] {
  const certs: string[] = [];
  let cert: string[] = [];

  certificate.split('\n').forEach((line) => {
    line.includes;
    if (line.match(PEM_HEADER)) {
      cert = [];
    }

    if (line.length > 0) {
      cert.push(line);
    }

    if (line.match(PEM_FOOTER)) {
      certs.push(cert.join('\n').concat('\n'));
    }
  });

  return certs;
}

export function toDER(certificate: string): Buffer {
  let der = '';

  certificate.split('\n').forEach((line) => {
    if (line.match(PEM_HEADER) || line.match(PEM_FOOTER)) {
      return;
    }

    der += line;
  });

  return Buffer.from(der, 'base64');
}

// Translates a DER-encoded buffer into a PEM-encoded string. Standard PEM
// encoding dictates that each certificate should have a trailing newline after
// the footer.
export function fromDER(certificate: Buffer, type = 'CERTIFICATE'): string {
  // Base64-encode the certificate.
  const der = certificate.toString('base64');
  // Split the certificate into lines of 64 characters.
  const lines = der.match(/.{1,64}/g) || '';

  return [`-----BEGIN ${type}-----`, ...lines, `-----END ${type}-----`]
    .join('\n')
    .concat('\n');
}
