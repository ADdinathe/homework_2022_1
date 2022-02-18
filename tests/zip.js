'use strict';

QUnit.module('Тестируем функцию zip', function () {
    QUnit.test('Функция работает с единственным объектом', function (assert) {
        assert.deepEqual(zip({}), {});
        assert.deepEqual(zip({answer: 42}), {answer: 42});
        assert.deepEqual(zip({name: 'Georg'}), {name: 'Georg'});
        const obj = {
            count: 0,
            cost: '120$'
        };
        assert.deepEqual(zip(obj), obj);
    });

    QUnit.test('Функция работает с объектами среди которых есть объекты без свойств', function (assert) {
        assert.deepEqual(zip({}, {}), {});
        assert.deepEqual(zip({answer: 42}, {}), {answer: 42});
        assert.deepEqual(zip({}, {answer: 42}), {answer: 42});
        assert.deepEqual(zip({}, {answer: 42}), {answer: 42});
        assert.deepEqual(zip({}, {}, {}, {name: 'Georg'}), {name: 'Georg'});

        const obj = {
            count: 0,
            cost: '120$'
        };

        assert.deepEqual(zip({}, {}, {}, obj, {}, {}), obj);
    });

    QUnit.test('Функция работает с объектами со свойствами с разными именами', function (assert) {
        const obj = {
            count: 0,
            cost: '120$'
        };

        assert.deepEqual(zip({count: 0}, {cost: '120$'}), obj);

        const obj2 = {
            a: 1,
            b: 2,
            c: null,
            d: 4,
            e: 5
        };
        assert.deepEqual(zip({a: 1}, {b: 2}, {c: null}, {d: 4}, {e: 5}), obj2);

        const obj3 = {
            name: 'age',
            value: 42
        };

        const obj4 = {
            prop: false,
            attr: null
        };

        const obj5 = {
            name: 'age',
            value: 42,
            prop: false,
            attr: null
        };

        assert.deepEqual(zip(obj3, obj4), obj5);
    });

    QUnit.test('Функция правильно работает со свойствами, которые встречаются в нескольких объектах', function (assert) {
        assert.deepEqual(zip({answer: 42}, {answer: false}), {answer: 42}, 'Значение должно браться из первого встретившегося поля');
        assert.deepEqual(zip({age: 5}, {}, {age: 4}, {age: 72}), {age: 5});

        const obj = {
            name: 'age',
            value: 42
        };
        assert.deepEqual(zip({name: 'age'}, {value: 42}, {name: 'cost'}, {value: -6}), obj);
    });

    QUnit.test('Функция правильно работает с объектами с разным количеством свойств, среди которых есть повторы', function (assert) {
        const obj1 = {
            name: 'age',
            value: 42,
        };

        const obj2 = {
            name: 'age2',
            prop: false,
            attr: null,
        };

        const obj3 = {
            name: 'age',
            value: 42,
            prop: false,
            attr: null,
        };

        assert.deepEqual(zip(obj1, obj2), obj3);
    });

    QUnit.test('Функция правильно работает без аргументов', function (assert) {
        assert.deepEqual(zip(), {});
    });

    QUnit.test('Функция правильно работает с неправильными аргументами', function (assert) {
        assert.deepEqual(zip(undefined, undefined), {});
        assert.deepEqual(zip(null, null), {});
        assert.deepEqual(zip(true, false), {});
        assert.deepEqual(zip(Infinity, Infinity), {});
        assert.deepEqual(zip(NaN, NaN), {});
        assert.deepEqual(zip(-0, 1, +0), {});
        assert.deepEqual(zip('ab', 'cde'), {});
        assert.deepEqual(zip(['a'], ['bc', 'def']), {});
    });

    QUnit.test('Собственный тест', function (assert) {
        const obj1 = {
            deep: {
                foo: 'bar',
                baz: 42,
            }
        };

        const obj2 = {
            deep: {
                foo: 'barbar',
                foobar: 0,
                nested: {
                    object: {
                        fields: {
                            foo: 42,
                            bar: 42,
                            baz: 42,
                        }
                    }
                }
            }
        };

        const obj3 = {
            deep: {
                foo: 'bar',
                foobar: 0,
                baz: 42,
                nested: {
                    object: {
                        fields: {
                            foo: 42,
                            bar: 42,
                            baz: 42,
                        }
                    }
                }
            }
        };

        const obj4 = {
            name: 'age',
            value: {
                age: 12,
            },
        };

        const obj5= {
            name: 'age2',
            prop: false,
            value: {
                age: 24,
                stage: 3
            },
        };

        const obj6 = {
            name: 'age',
            value: {
                age: 12,
                stage: 3
            },
            prop: false,
        };
        assert.deepEqual(zip(obj1, obj2), obj3);
        assert.deepEqual(zip(obj4, obj5), obj6);
    });
});