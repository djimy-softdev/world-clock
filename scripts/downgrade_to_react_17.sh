#!/usr/bin/env sh

json_file='package.json'

sed -i '' 's#"@testing-library/react": .*$#"@testing-library/react": "^12.1.4",#g' ${json_file}
sed -i '' 's#"@types/react": .*$#"@types/react": "^17.0.2",#g' ${json_file}
sed -i '' 's#"@types/react-dom": .*$#"@types/react-dom": "^18.0.0",#g' ${json_file}
sed -i '' 's#"@types/styled-components": .*$#"@types/styled-components": "^5.1.25",#g' ${json_file}
sed -i '' 's#"react": .*$#"react": "^17.0.2",#g' ${json_file}
sed -i '' 's#"react-dom": .*$#"react-dom": "^17.0.2",#g' ${json_file}