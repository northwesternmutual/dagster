# pylint: disable=unused-import
from functools import partial

from json import dump as dump_
from orjson import dumps as dumps_

from json import load as load_
from orjson import loads
from orjson import OPT_SORT_KEYS

try:
    from json import JSONDecodeError
except ImportError:
    JSONDecodeError = ValueError  # type: ignore[misc, assignment]

dump = partial(dump_, sort_keys=True)


def dumps(*args, **kwargs):
    return partial(dumps_, option=OPT_SORT_KEYS)(*args, **kwargs).decode("utf-8")


load = partial(load_, strict=False)