# frontend-project-46

## Вычислитель отличий

Программа сравнивает два файла (JSON/YAML) и показывает различия.

### Установка

```bash
make install
```

### Использование

```bash
gendiff file1.json file2.json
```

Форматы вывода:
- stylish (по умолчанию)
- plain
- json

```bash
gendiff --format plain file1.yml file2.yml
```
